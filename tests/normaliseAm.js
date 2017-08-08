describe("jQuery.normaliseAm", function () {

    it("should prefix the attribute with \"" + $.AM_PREFIX + "\"", function () {
        chai.assert.equal($.normaliseAm("test"), $.AM_PREFIX + "test");
    });

    it("should not prefix an already prefixed attribute", function () {

        var attr = $.AM_PREFIX + "test";

        chai.assert.equal($.normaliseAm(attr), attr);

    });

    it("should normalise the string", function () {

        var prefix = $.AM_PREFIX;

        chai.assert.equal($.normaliseAm(1), prefix + "1");
        chai.assert.equal($.normaliseAm(), prefix);
        chai.assert.equal($.normaliseAm(null), prefix);
        chai.assert.equal($.normaliseAm({}), prefix + "[object Object]");

    });

    it("should allow the prefix to be changed", function () {

        var prefix1 = $.AM_PREFIX;
        var prefix2 = "pre-";

        chai.assert.equal($.normaliseAm("test"), prefix1 + "test");
        $.AM_PREFIX = prefix2;
        chai.assert.equal($.normaliseAm("test"), prefix2 + "test");
        $.AM_PREFIX = prefix1;

    });

    it("should have the alias jQuery.normalizeAm", function () {
        chai.assert.equal($.normaliseAm, $.normalizeAm);
    });

});
