// TODO script fait une proposition de key
// TODO commence par regen (ou hash compare)
// TODO verif dir
// TODO must know how to delete
// TODO recursive mkdir marche ?

// TODO choix key:
// Hello { firstname: string }
// VS
// Hello $firstname

// TODO key avec ou sans espaces

// TODO fail si missing string

const fs = require('fs/promises');

const rootDir = './src';

const generate = async (filename) => {
    let file;
    try {
        file = await fs.readFile(rootDir + '/' + filename);
    } catch (e) {
        return undefined
    }
    const content = file.toString();
    const messages = content.split('\n\n').map(b => {
        const parts = b.split('\n')
        if (parts.length === 0) {
            return undefined
        }
        const rawKey = parts[0]//.substring(0, parts[0].indexOf('//'));
        const key = rawKey.trim().replaceAll('$', '').replaceAll(' ', '_')
        const parameters = [];
        const message = (parts[1] ?? '**** missing message ****')
            .trim()
            .split(' ')
            .map(p => {
                if (p[0] === '$') {
                    const parameter = p.substring(1)
                    parameters.push(parameter)
                    return '${' + parameter + '}'
                } else {
                    return p
                }
            })
            .join(' ');
        return {key, message, parameters};
    }).filter(m => m !== undefined)
    let result = "const t = {\n";
    messages.forEach(m => {
        result += '  ' + m.key + ': ';
        if (m.parameters.length === 0) {
            result += '\'' + m.message + '\',\n'
        } else {
            result += '(' + m.parameters.map(p => p + ": string").join(", ") + ') => `' + m.message + '`,\n'
        }
    })
    result += "};\nexport default t;"
    const target = rootDir + '/generated/' + filename + '.ts';
    const dir = target.substring(0, target.lastIndexOf('/'));
    await fs.mkdir(dir, {recursive: true})
    await fs.writeFile(target, result);
    console.log('Generated ' + target)
}

const handleEvent = (event) => {
    if (event.eventType === 'change' || event.eventType === 'rename') {
        const extension = event.filename.substring(event.filename.indexOf('.') + 1)
        if (extension === 'i18n') {
            generate(event.filename)
        }
    }
}

(async () => {
    try {
        const watcher = fs.watch(rootDir, {recursive: true});
        for await (const event of watcher)
            handleEvent(event)
    } catch (err) {
        if (err.name === 'AbortError')
            return;
        throw err;
    }
})();