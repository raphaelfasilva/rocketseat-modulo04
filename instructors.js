const fs = require("fs")
const data = require('./data')
const { age } = require('./util')
exports.show = function(req, res) {
    const { id } = req.params
    const foundInstructors = data.instructors.find(function(instructors) {
        return instructors.id == id
    })
    if (!foundInstructors) {
        res.send("instrutor não encontrado")
    }
    const instructor = {
        ...foundInstructors,
        age: age(foundInstructors.birth),
        services: foundInstructors.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructors.created_at),

    }
    return res.render("instructors/show", { instructor })

}
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
exports.edit = function(req, res) {
    return res.render("instructors/edit")
}