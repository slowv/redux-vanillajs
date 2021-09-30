export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
        .filter(x => x && x !== true || x === 0)
        .join('');
}

export function createStore(reducer) {
    let state = reducer();
    const roots = new Map();

    function render() {
        for (const [root, component] of roots) {
            root.innerHTML = component();
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect(selector = state => state) {
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), ...args));
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        }
    }
}

export function createUUID(){
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function toaster(title, content) {
    const $liveToast = $('#liveToast');
    const $title = $liveToast.find('.title');
    const $content = $liveToast.find('.content');
    const $time = $liveToast.find('.time');

    $title.text(title);
    $content.text(content);
    const date = new Date();
    $time.text(((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' +
        (date.getMonth() + 1))) +
        '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) +
        '/' + date.getFullYear() +
        ' ' + ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours())) +
        ':' + ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes())) +
        ':' + ((date.getSeconds() > 9) ? date.getSeconds() : ('0' + date.getSeconds())));

    const toast = new bootstrap.Toast($liveToast);
    toast.show();
}