describe('Service Memo', function () {
    beforeEach(module('memo')); // inject our services module
    var MemoService;

    beforeEach(inject(function (_MemoService_) {
        MemoService = _MemoService_; // inject our Calculator service
    }));

    it('should shuffle an array', function () {
        var testArray = [
            'champion1', 'champion2', 'champion3', 'champion4', 'champion5'
        ]
        var initialIndex = testArray.indexOf('champion1');
        var initialLength = testArray.length;

        MemoService.shuffle(testArray);

        // the new array should have the same number of elements
        expect(testArray.length).toEqual(initialLength);
        // elements order should have changed
        var resultIndex = testArray.indexOf('champion');
        expect(initialIndex).not.toEqual(resultIndex);
    });
});
