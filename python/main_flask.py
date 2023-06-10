from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from ffmpeg_streaming import Formats, Bitrate, Representation, Size
import ffmpeg_streaming

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



def create_app(test_config = None):
    app = Flask(__name__)
    CORS(app)

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
        

        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO userdb (U_name, U_mail, U_pass, U_type, U_vid, U_permit) VALUES (%s, %s, %s, %s, %s, %s)',
            (username, email, hashed_password, 'user', 0, 1)
        )
        conn.commit()
        cursor.close()
        conn.close()
        
        # enable this on deploy
        folder_path = '../user_upload_folder/'+username #create folder for uploaded videos
        os.makedirs(folder_path)

        return ({
                    'status': 'success',
                    'data': {}
                })
    
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()

        conn = create_conn()

        email = data.get('email')
        plain_password = data.get('password')

        # get password
        cursor = conn.cursor()
        cursor.execute(
            'SELECT * FROM userdb WHERE U_mail=%s',
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
                return ({
                    'status': 'success',
                    'data': {
                        'U_id': data[0],
                        'username': data[1],
                        'email': data[2],
                        'U_type': data[4],
                        'vid': data[5],
                        'U_permit': data[8]
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
            
    
    # @app.route('/upload', method=['POST'])
    # def upload():

    #     data = request.get_json()
    #     video_name = data.get('video_name')

        
    #     return ''

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
        cursor.execute('SELECT U_id, U_name, U_mail, U_vid, U_type, U_permit FROM userdb')
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
        cursor.execute('SELECT U_type, U_permit FROM userdb WHERE U_id=%s', (U_id,))
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
    APP.run(host='0.0.0.0', port = 8900, debug=True) #ip:5000/predict
    #APP.run(debug=True)