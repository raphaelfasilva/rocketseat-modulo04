const fs = require("fs")
const data = require('./data')
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("por favor validar todos os campos")
        }
    }
    let { avatar_url, birth, name, services, gender } = req.body
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.send(req.body)
    })

}