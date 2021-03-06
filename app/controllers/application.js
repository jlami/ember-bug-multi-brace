import Ember from 'ember';

export default Ember.Controller.extend({
  items: [
    { id: 1, test: true, cat: 1},
    { id: 2, test: true, cat: 2},
    { id: 3, test: true, cat: 3},
    { id: 4, test: true, cat: 4},
    { id: 5, test: false, cat: 1},
    { id: 6, test: false, cat: 2},
    { id: 7, test: false, cat: 3},
    { id: 8, test: false, cat: 4},
    ],
  testFilter: false,
  
  filtered: Ember.computed('testFilter', 'items.@each.test', function() {
    let result = this.get('items');
    if (this.get('testFilter')) {
      result = result.filterBy('test');
    }
    return result;
  }),
  
  multiEach: Ember.computed('filtered.@each.{cat,id}', function() {
    return this.get('filtered').filter((item) => (item.id + item.cat) % 2 == 0);
  }),
    
  correct: Ember.computed.alias('multiEach'),
  bugged: Ember.computed(function() {
    return Ember.ArrayProxy.create({parent: this, content: Ember.computed.alias('parent.multiEach')});
  }),
});
