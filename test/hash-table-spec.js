const { expect } = require('chai');

const HashTable = require('../hash-table.js');

describe('Hash table constructor', () => {

  let hashTable;

  beforeEach(function () {

    hashTable = new HashTable(2);

  });

  it('has count, capacity and data properties', () => {

    expect(hashTable.count).to.equal(0);
    expect(hashTable.capacity).to.equal(2);
    expect(hashTable.data instanceof Array).to.be.true;
    expect(hashTable.data.length).to.equal(2);

    expect(hashTable.data[0]).to.equal(null);
    expect(hashTable.data[1]).to.equal(null);

  });

  it('can initialize to different sizes', () => {

    hashTable = new HashTable(4);

    expect(hashTable.count).to.equal(0);
    expect(hashTable.capacity).to.equal(4);
    expect(hashTable.data instanceof Array).to.be.true;
    expect(hashTable.data.length).to.equal(4);

    expect(hashTable.data[0]).to.equal(null);
    expect(hashTable.data[1]).to.equal(null);
    expect(hashTable.data[2]).to.equal(null);
    expect(hashTable.data[3]).to.equal(null);

  });


  it('can initialize to different sizes', () => {

    hashTable = new HashTable(2);

    expect(hashTable.count).to.equal(0);
    expect(hashTable.capacity).to.equal(2);
    expect(hashTable.data instanceof Array).to.be.true;
    expect(hashTable.data.length).to.equal(2);

    expect(hashTable.data[0]).to.equal(null);
    expect(hashTable.data[1]).to.equal(null);

  });


});

describe('Hash function', () => {

  let hashTable;

  beforeEach(function () {

    hashTable = new HashTable(2);

  });

  it('hash adds up all ASCII values in the input string', () => {

    expect(hashTable.hash("A")).to.equal(65);
    expect(hashTable.hash("B")).to.equal(66);
    expect(hashTable.hash("C")).to.equal(67);
    expect(hashTable.hash("ABC")).to.equal(198);

    expect(hashTable.hash("hello world")).to.equal(1116);

  });

  it('hashMod function returns the hash value modulo the number of buckets', () => {

    // 2 buckets
    expect(hashTable.hashMod("A")).to.equal(1);
    expect(hashTable.hashMod("B")).to.equal(0);
    expect(hashTable.hashMod("C")).to.equal(1);
    expect(hashTable.hashMod("ABC")).to.equal(0);

    expect(hashTable.hashMod("hello world")).to.equal(0);

    // 10 buckets
    hashTable = new HashTable(10);
    expect(hashTable.hashMod("A")).to.equal(5);
    expect(hashTable.hashMod("B")).to.equal(6);
    expect(hashTable.hashMod("C")).to.equal(7);
    expect(hashTable.hashMod("ABC")).to.equal(8);

    expect(hashTable.hashMod("hello world")).to.equal(6);

  });

});


describe('Hash table insert', () => {

  let hashTable;

  beforeEach(function () {

    hashTable = new HashTable(2);

  });

  it('can insert a value without collisions', () => {

    hashTable.insert("keyA", "valA");
    hashTable.insert("keyB", "valB");

    expect(hashTable.count).to.equal(2);
    expect(hashTable.capacity).to.equal(2);
    expect(hashTable.data.length).to.equal(2);

    const pairA = hashTable.data[0];
    const pairB = hashTable.data[1];

    expect(pairA.key).to.equal("keyA");
    expect(pairA.value).to.equal("valA");
    expect(pairB.key).to.equal("keyB");
    expect(pairB.value).to.equal("valB");

  });

  it('can insert a value with linked list collisions', () => {

    hashTable.insert("keyA", "valA");
    hashTable.insert("keyB", "valB");
    hashTable.insert("keyC", "valC");

    expect(hashTable.count).to.equal(3);
    expect(hashTable.capacity).to.equal(2);
    expect(hashTable.data.length).to.equal(2);

    const pairC = hashTable.data[0];
    const pairB = hashTable.data[1];
    const pairA = hashTable.data[0].next;

    expect(pairA.key).to.equal("keyA");
    expect(pairA.value).to.equal("valA");

    expect(pairB.key).to.equal("keyB");
    expect(pairB.value).to.equal("valB");

    expect(pairC.key).to.equal("keyC");
    expect(pairC.value).to.equal("valC");

  });

});

