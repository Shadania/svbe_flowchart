export function getColorBG(color) {
    const dic = {
        'cyan': 'bg-cyan-500 hover:bg-cyan-700',
        'indigo': 'bg-indigo-500 hover:bg-indigo-700',
        'orange': 'bg-orange-500 hover:bg-orange-700',
        'green': 'bg-green-500 hover:bg-green-700'
    }
    return dic[color]
}