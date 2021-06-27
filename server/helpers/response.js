module.exports = {
    RenderHTML: (res, path, data) => {
        return res.render(path, data);
    },
    Redirect: (res, url) => {
        return res.redirect(url);
    },
    Success: (res, data, message = null, code = 200) => {
        return res.status(200).json({
            data: data,
            message: message || ''
        }).end();
    },
    NotFound: (res, message, code = 404) => {
        return res.status(404).json({'message': message}).end();
    },
    Abort: (res, code = 500,  message = null) => {
        if (message) {
            if (typeof message == 'string') {
                message = [message];
            }

            return res.status(code).json({'message': message}).end();
        } else {
            return res.status(code).json().end();
        }
    },
    Unauthorized: (res, message = null) => {
        return res.status(403).json({'message': message}).end();
    }
};
