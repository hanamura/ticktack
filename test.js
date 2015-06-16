var expect = require('chai').expect;

var Tick = require('./index');

describe('Tick', function() {
  it('should emit tick event', function(done) {
    var t = new Tick;
    var f = function() {
      t.off('tick', f);
      done();
    };
    t.on('tick', f);
  });

  it('should pass tick object to callback', function(done) {
    var t = new Tick;
    var f = function(tick) {
      t.off('tick', f);
      expect(tick).to.equal(t);
      done();
    };
    t.on('tick', f);
  });

  it('should pass date object to callback', function(done) {
    var t = new Tick;
    var f = function(tick, date) {
      t.off('tick', f);
      expect(date).to.be.an.instanceof(Date);
      done();
    };
    t.on('tick', f);
  });

  it('should have boolean requestAnimationFrame property', function() {
    var t = new Tick;
    expect(t).to.have.property('requestAnimationFrame');
    expect(t.requestAnimationFrame).to.be.a('boolean');
  });

  it('should emit tick events several times', function(done) {
    var count = 0;
    var t = new Tick;
    var f = function() {
      count++;
    };
    t.on('tick', f);

    setTimeout(function() {
      t.off('tick', f);
      expect(count).to.be.above(10);
      done();
    }, 1000);
  });
});
