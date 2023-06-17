
import random
import string
from flask import Flask, json, request, jsonify, send_file
from flask_cors import CORS
from ffmpeg_streaming import Formats, Bitrate, Representation, Size
import ffmpeg_streaming
import jwt
from datetime import datetime, timedelta

import secrets
import subprocess
import bcrypt
import psutil
import os
import time
from conn import create_conn

# video resolutions
_144p  = Representation(Size(256, 144), Bitrate(95 * 1024, 64 * 1024))
_240p  = Representation(Size(426, 240), Bitrate(150 * 1024, 94 * 1024))
_360p  = Representation(Size(640, 360), Bitrate(276 * 1024, 128 * 1024))
_480p  = Representation(Size(854, 480), Bitrate(750 * 1024, 192 * 1024))
_720p  = Representation(Size(1280, 720), Bitrate(2048 * 1024, 320 * 1024))
_1080p = Representation(Size(1920, 1080), Bitrate(4096 * 1024, 512 * 1024))
_1440p = Representation(Size(2560, 1440), Bitrate(8192 * 1024, 768 * 1024))
# _4K = Representation(Size(3840, 2160), Bitrate(16384 * 1024, 1024 * 1024))

vidResolutions = [_144p, _240p, _360p, _480p, _720p, _1080p, _1440p]
tmpResolutions = ['144', '240', '360', '480', '720', '1080', '1440']



def create_app(test_config = None):
    app = Flask(__name__)
    app.config['SECRET_KEY'] = '123'
    CORS(app)

# function section
    # use to gen new video name for store in db
    def genFileName(name):
        ran_text = os.urandom(8).hex()
        name += ran_text
        random.seed(name)
        characters = string.ascii_letters + string.digits
        new_name = ''.join(random.choices(characters, k=12))
        encode = new_name
        return encode
    
    def convert(path, vidData):
        # print(vidData.get('height'))
        try:
            print('convert' + path)
            video = ffmpeg_streaming.input(path)
            # print(video)
            hls = video.hls(Formats.h264())
            # print('hls')
            # maxRes = vidData.get('height')
            # idx = tmpResolutions.index(str(maxRes))
            # for i in range(idx+1):
            #     hls.representations(vidResolutions[i])
            hls.representations(_144p, _240p, _360p, _480p, _720p, _1080p, _1440p)
            print('convert')
            hls.output('..\\user_upload_folder\\'+vidData.get('path')+'\\' + vidData.get('encode') + '\\' + vidData.get('encode') + '.m3u8')
            print('convert success')
            os.remove(path)
            insertVidData(vidData)
        except Exception as e:
            print('Error:', e)
            pass

    def insertVidData(data):
        conn = create_conn()

        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO videos (V_title, V_view, V_length, V_size, U_id, V_permit, V_encode, V_quality, V_desc) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)',
            (data.get('videoName'), 0, data.get('videoDuration'), data.get('videoSize'), data.get('videoOwner'), data.get('videoPermit'), data.get('encode'), data.get('height'), data.get('videoDesc'))
        )
        conn.commit()
        cursor.close()
        conn.close()

    def verify(raw_token):
        if raw_token is None or not raw_token.startswith('Bearer '):
            return 'Invalid token', 401

        token = raw_token.split(' ')[-1]
        try:
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            
            # Additional verification or processing can be done here
            return payload, 200
        except jwt.ExpiredSignatureError:
            # return jsonify({'message': 'Token has expired'}), 401
            return 'token expired', 401
        except jwt.InvalidTokenError:
            # return jsonify({'message': 'Invalid token'}), 401
            return 'invalid token', 401


# api section
    @app.route('/')
    def welcome():
        return "hello this is flask python"
        
    @app.route('/register', methods=['POST'])
    def register():
        # Get the data from the request
        data = request.get_json()
        # create connection
        conn = create_conn()

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        encode_password = str(password).encode('utf-8')
        hashed_password = bcrypt.hashpw(encode_password, bcrypt.gensalt())
        file_name = genFileName(username)

        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO users (U_name, U_mail, U_pass, U_type, U_vid, U_permit, U_folder) VALUES (%s, %s, %s, %s, %s, %s, %s)',
            (username, email, hashed_password, 'user', 0, 1, file_name)
        )
        conn.commit()
        cursor.close()
        conn.close()
        
        folder_path = '../user_upload_folder/'+file_name #create folder for uploaded videos
        os.makedirs(folder_path)
        return ({
                'status': 'success',
                'data': {}
            }), 200
        
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()

        conn = create_conn()

        email = data.get('email')
        plain_password = data.get('password')

        # get password
        cursor = conn.cursor()
        cursor.execute(
            'SELECT * FROM users WHERE U_mail=%s',
            (email,)
        )
        # print('select success')
        data = cursor.fetchone()
        # print('get hashed')
        
        # print(hashed_password)
        if data is not None:
            hashed_password = data[3]

            if bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8')):
                conn.commit()
                cursor.close()
                conn.close()

                payload = {
                    'U_id': data[0],
                    'U_type': data[4],
                    'U_permit': data[8],
                    'exp': datetime.utcnow() + timedelta(days=30)
                }
                
                token = jwt.encode(payload , app.config['SECRET_KEY'], algorithm='HS256')

                return ({
                    'status': 'success',
                    'token': token,
                    'data': {
                        'U_id': data[0],
                        'username': data[1],
                        'email': data[2],
                        'U_type': data[4],
                        'vid': data[5],
                        'U_permit': data[8],
                        'U_folder': data[9]
                    }
                }), 200
            else:
                # print('not correct')
                conn.commit()
                cursor.close()
                conn.close()
                return ({
                    'status': 'fail',
                    'data': {}
                }), 200
        
        return ''

    @app.route('/verify', methods=['POST'])
    def verify_token():
        raw_token = request.headers.get('Authorization')

        if raw_token is None or not raw_token.startswith('Bearer '):
            return 'Invalid token', 401

        token = raw_token.split(' ')[-1]
        try:
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            
            # Additional verification or processing can be done here
            return jsonify(payload), 200
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

    @app.route('/upload', methods=['POST'])
    def upload():
        token = request.headers.get('Authorization')
        
        if(verify(token)[-1] == 200):
            file = request.files['video']
            data = request.form['data']


            vid_data = json.loads(data)
            vidName = file.filename
            new_name = genFileName(vidName.split('.')[0])

            vid_data['encode'] = new_name

            # print(vid_data)

            if file:
                save_path = '../user_upload_folder/'+ vid_data['path'] +'/'+ new_name + '.' + vid_data['videoType']
                file.save(save_path)

                # Wait until the file is successfully saved
                while not os.path.exists(save_path):
                    time.sleep(1)

                convert(save_path, vid_data)
                return ({'message': 'success'}), 200

            else:
                return ({'message': 'fail'}), 401
        else:
            return ({'message': 'token invalid'}), 401

    @app.route('/download')
    def download():
        video_url = request.args.get('video_url')

        subprocess.run(['ffmpeg', '-i', video_url, 'output.mp4', '-y'])
        response = send_file('output.mp4', as_attachment=True)

        return response
    
    @app.route('/getUsers')
    def getUsers():
        conn = create_conn()

        cursor = conn.cursor()
        cursor.execute('SELECT U_id, U_name, U_mail, U_vid, U_type, U_permit FROM users')
        data = cursor.fetchall()
        conn.commit()
        cursor.close()
        conn.close()

        users = []
        for row in data:
            user = {
                'U_id': row[0],
                'U_name': row[1],
                'U_mail': row[2],
                'U_vid': row[3],
                'U_type': row[4],
                'U_permit': row[5]
            }
            users.append(user)

        return jsonify(users), 200
    
    @app.route('/getPermit', methods=['GET'])
    def getPermit():
        U_id = request.args.get('id')

        conn = create_conn()

        cursor = conn.cursor()
        cursor.execute('SELECT U_type, U_permit FROM users WHERE U_id=%s', (U_id,))
        data = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()

        return ({
            'status': 'success',
            'data': {
                'U_type': data[0],
                'U_permit': data[1]
            }
        }), 200
    
    @app.route('/server_resource')
    def server():
        #CPU INFO
        cpu_used = psutil.cpu_percent()

        #Memory INFO [Ram Used]
        mem = psutil.virtual_memory().percent

        #Disk INFO
        disk_usage = psutil.disk_usage(os.getcwd())
        disk_total = round(disk_usage.total / (1024*1024*1024), 2)
        disk_used = round(disk_usage.used / (1024*1024*1024), 2)
        disk_free = round(disk_usage.free / (1024*1024*1024), 2)
        disk_used_percent = round(disk_usage.percent,2)

        #Network INFO
        inf = "Ethernet"
        net_stat = psutil.net_io_counters(pernic=True, nowrap=True)[inf]
        net_in_1 = net_stat.bytes_recv
        net_out_1 = net_stat.bytes_sent
        time.sleep(1)
        net_stat = psutil.net_io_counters(pernic=True, nowrap=True)[inf]
        net_in_2 = net_stat.bytes_recv
        net_out_2 = net_stat.bytes_sent

        net_in = round((net_in_2 - net_in_1) / 1024 / 1024, 3)
        net_out = round((net_out_2 - net_out_1) / 1024 / 1024, 3)

        return jsonify({'CPU_Used': str(cpu_used)+"%",
                  'Memory_Used' : str(mem)+"%",
                  'Disk_Total' : str(disk_total)+' GB',
                  'Disk_Used' : str(disk_used)+' GB',
                  'Disk_Free' : str(disk_free)+' GB',
                  'Disk_Used_Percent' : str(disk_used_percent)+'%',
                  'Network_Download' : str(net_in)+' MB/s',
                  'Network_Upload' : str(net_out)+' MB/s'}), 200
    return app
APP = create_app()

if __name__ == '__main__':
    APP.run(host='0.0.0.0', port = 8900, debug=True) 
    #APP.run(debug=True)