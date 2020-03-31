const createErr = (status, message) => {
    return {
        status,
        message
    }
}

module.exports= createErr