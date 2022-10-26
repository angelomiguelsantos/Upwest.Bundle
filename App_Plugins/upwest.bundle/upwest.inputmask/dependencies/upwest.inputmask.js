function checkMask(element,mask,clear) {
    if (typeof mask !== 'undefined') {
        element.inputmask(mask, { "clearIncomplete": clear });
    }
}