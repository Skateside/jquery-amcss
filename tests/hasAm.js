describe("jQuery#hasAm", function () {

    it("should check if the attribute exists", function () {

        var jQdiv = $("<div " + $.AM_PREFIX + "has=\"one\"></div>");

        chai.assert.isTrue(jQdiv.hasAm("has"));
        chai.assert.isFalse(jQdiv.hasAm("not"));

    });

    it("should only check the first element", function () {

        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var jQdivs = $([div1, div2]);

        div1.setAttribute($.AM_PREFIX + "test", "one");
        chai.assert.isTrue($(div1).hasAm("test"));
        chai.assert.isFalse($(div2).hasAm("test"));
        chai.assert.isTrue(jQdivs.hasAm("test"));

    });

    it("should return false for non elements", function () {
        chai.assert.isFalse($().hasAm("test"));
    });

    it("should check if the attribute has one or more values", function () {

        var prefix = $.AM_PREFIX;
        var jQdiv = $(
            "<div " + prefix + "test=\"one two\" " + prefix + "empty></div>"
        );

        // Values work.
        chai.assert.isTrue(jQdiv.hasAm("test", "one"));
        chai.assert.isTrue(jQdiv.hasAm("test", "one two"));
        chai.assert.isTrue(jQdiv.hasAm("test", "two one"));
        chai.assert.isFalse(jQdiv.hasAm("test", "three"));
        chai.assert.isFalse(jQdiv.hasAm("test", "two three"));

        // Empty attributes work.
        chai.assert.isTrue(jQdiv.hasAm("empty"));
        chai.assert.isTrue(jQdiv.hasAm("empty", ""));
        chai.assert.isFalse(jQdiv.hasAm("empty", "something"));

    });

});
