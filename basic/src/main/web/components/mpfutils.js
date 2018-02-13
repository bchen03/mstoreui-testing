const MpfUtils = (function() {
    var emptyIfFalsy = function(value) {
        return value ? value : "";
    }

    return {
        emptyIfFalsy: emptyIfFalsy
    };
})();

export default MpfUtils;