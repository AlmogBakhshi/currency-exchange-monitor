// @desc    Get All T
// @route   GET /api/t
// @access  Public
module.exports.getT = async (req, res, T) => {
    return await T.find()
        .then(data => res.status(200).json({
            success: true,
            data: data
        }))
        .catch(() => res.status(500).json({
            success: false,
            error: "Server Error"
        }))
}

// @desc    Get T
// @route   GET /api/t:id
// @access  Public
module.exports.getTByID = async (req, res, T, notFoundMessage) => {
    return await T.findById(req.params.id)
        .then(data => !data ?
            res.status(404).json({
                success: false,
                error: notFoundMessage
            }) :
            res.status(201).json({
                success: true,
                data: data
            })
        )
        .catch(() => res.status(500).json({
            success: false,
            error: "Server Error"
        }))
}

// @desc    Add T
// @route   POST /api/t
// @access  Public
module.exports.addT = async (req, res, T) => {
    return await T.create(req.body)
        .then(data => res.status(201).json({
            success: true,
            data: data
        }))
        .catch(err => {
            if (err.name === "ValidationError") {
                const messages = Object.values(err.errors).map(val => val.message);
                return res.status(400).json({
                    success: false,
                    error: messages
                });
            }
            else
                return res.status(500).json({
                    success: false,
                    error: "Server Error"
                })
        })
}

// @desc    Update T
// @route   PUT /api/t:id
// @access  Public
module.exports.updateT = async (req, res, T, notFoundMessage) => {
    return await T.findById(req.params.id)
        .then(data => !data ?
            res.status(404).json({
                success: false,
                error: notFoundMessage
            }) :
            data.updateOne(req.body).then(update => {
                return res.status(201).json({
                    success: true,
                    data: update
                })
            }
            )
        )
        .catch(err => {
            if (err.name === "ValidationError") {
                const messages = Object.values(err.errors).map(val => val.message);
                return res.status(400).json({
                    success: false,
                    error: messages
                });
            }
            else
                return res.status(500).json({
                    success: false,
                    error: "Server Error"
                })
        })
}

// @desc    Delete T
// @route   DELETE /api/t:id
// @access  Public
module.exports.deleteT = async (req, res, T, notFoundMessage) => {
    return await T.findById(req.params.id)
        .then(data => !data ?
            res.status(404).json({
                success: false,
                error: notFoundMessage
            }) :
            data.remove().then(removed =>
                res.status(201).json({
                    success: true,
                    data: removed
                })
            )
        )
        .catch(() => res.status(500).json({
            success: false,
            error: "Server Error"
        }))
}