# DEBUG
A devtools's javascript helper that use template strings


## Usage

```javascript
DEBUG`Some text with ${substitution}s`
```

It will use the console.log substitution ( 'Some text: %s', foo ) so you have to specify the same type
after the bracket substitution: 
```javascript
DEBUG`Some object: ${obj}o and some text: ${str}s or a number ${i}n`
```

If you use multiline, the 1st line used to specify tags when to actually make the log or not:
```javascript
DEBUG.myTag = true
DEBUG`myTag
	Some text`		// shown
delete DEBUG.myTag
DEBUG`myTag
	Some text`		// not shown
```

There are also one tag for each console method to specify which method you want:
```javascript
DEBUG`info
	The object is created`
DEBUG`error
	The object is not created`
```

You can then use the mix of 2:
```javascript
DEBUG.events = true
DEBUG.popups = true
DEBUG`events popups error
	This popup is not created`
```

There is also console's css support by using ${}c substitution:
```javascript
DEBUG`The color is ${'color:orange'}cORANGE`
```

The is a c property on DEBUG to store pre-cooked css strings to use with DEBUG message (see above)
```javascript
DEBUG`The object type is ${DEBUG.c.stamp}c ${obj.constructor.name}`
```

Finally, to completely disable DEBUG without clearing each call in you code:
```javascript
var DEBUG = window.DEBUG = o=>o
```

 
