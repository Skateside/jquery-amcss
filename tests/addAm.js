describe("jQuery#addAm", function () {

    it("should add to an AM attribute", function () {

        var prefix = $.AM_PREFIX;
        var attrs = {};
        attrs[prefix + "alpha"] = "one";
        attrs[prefix + "bravo"] = "one";
        var jQdiv = $("<div/>", attrs);

        jQdiv.addAm("alpha", "two");
        chai.assert.equal(jQdiv.am("alpha"), "one two");

        jQdiv.addAm("bravo", function (i, value) {
            return value + value;
        });
        chai.assert.equal(jQdiv.am("bravo"), "one oneone");

    });

    it("should create an AMCSS attribute if not already there", function () {

        var div = document.createElement("div");
        var jQdiv = $(div);

        jQdiv.addAm("test", "a");
        chai.assert.isTrue(div.hasAttribute($.AM_PREFIX + "test"));
        jQdiv.addAm("other");
        chai.assert.isTrue(div.hasAttribute($.AM_PREFIX + "other"));

    });

    it("should be able to add multiple values at once", function () {

        var jQdiv = $("<div/>");

        jQdiv.addAm("test", "one two");
        jQdiv.addAm("test", "three   four");

        chai.assert.equal(jQdiv.am("test"), "one two three four");

    });

    it("should not add the same value twice", function () {

        var jQdiv = $("<div " + $.AM_PREFIX + "test=\"one\"></div>");

        jQdiv.addAm("test", "one");
        jQdiv.addAm("test", "two one");

        chai.assert.equal(jQdiv.am("test"), "one two");

    });

    it("should be able to affect multiple AM attributes at once", function () {

        var jQdiv = $("<div/>");

        jQdiv.addAm({
            one: "a b",
            two: "c d"
        });

        chai.assert.equal(jQdiv.am("one"), "a b");
        chai.assert.equal(jQdiv.am("two"), "c d");

    });

    it("should do nothing if passed undefined", function () {

        var jQdiv = $("<div " + $.AM_PREFIX + "test=\"one\"></div>");

        jQdiv.addAm("test");
        chai.assert.equal(jQdiv.am("test"), "one");

    });

    it("should return a jQuery instance", function () {
        chai.assert.instanceOf($("<div/>").addAm("test", "one"), $);
        chai.assert.instanceOf($("<div/>").addAm("test"), $);
    });

});
