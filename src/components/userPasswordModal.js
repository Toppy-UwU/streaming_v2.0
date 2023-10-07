const UpdatePasswordModal = () => {
    return (
        <div className="modal fade" id="UpdatePasswordModal" tabindex="-1" aria-labelledby="UpdatePasswordModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 fw-bold" id="UpdatePasswordModal">Password Setting</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="VideoDataInput">
                            <div class="form-floating mb-4">
                                <input type="text" class="form-control" id="floatingInput" placeholder="Current Password" required />
                                <label for="floatingInput">Current Password</label>
                            </div>
                            <hr />
                            <div class="form-floating mb-4">
                                <input type="text" class="form-control" id="floatingInput" placeholder="New Password" required />
                                <label for="floatingInput">New Password</label>
                            </div>
                            <div class="form-floating mb-4">
                                <input type="text" class="form-control" id="floatingInput" placeholder="Confirm New Password" required />
                                <label for="floatingInput">Confirm New Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdatePasswordModal;