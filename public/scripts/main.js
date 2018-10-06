class Person {
  constructor(name) {
    this.name = name;
  }

  hello() {
    return typeof this.name ? `Hello, I am ${this.name}!` : 'Hello!';
  }
}

const person = new Person('Sam');
const greetingHTML = templates['greeting']({
  message: person.hello()
})

document.write(greetingHTML);
