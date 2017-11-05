/**
 * Usage:
 * DEBUG`Some text with ${substitution}s`
 * 
 * It will use the console.log substitution ( 'Some text: %s', foo ) so you have to specify the same type
 * after the bracket substitution: 
 * DEBUG`Some object: ${obj}o and some text: ${str}s or a number ${i}n`
 * 
 * If you use multiline, the 1st line used to specify tags when to actually make the log or not:
 * DEBUG.myTag = true
 * DEBUG`myTag
 		Some text`		// shown
 * delete DEBUG.myTag
 * DEBUG`myTag
 		Some text`		// not shown
 * 
 * There are also one tag for each console method to specify which method you want:
 * DEBUG`info
		The object is created`
 * DEBUG`error
		The object is not created`
 * 
 * You can then use the mix of 2:
 * DEBUG.events = true
 * DEBUG.popups = true
 * DEBUG`events popups error
		This popup is not created`
 * 
 * There is also console's css support by using ${}c substitution:
 * DEBUG`The color is ${'color:orange'}cORANGE`
 * 
 * The is a c property on DEBUG to store pre-cooked css strings to use with DEBUG message (see above)
 * DEBUG`The object type is ${DEBUG.c.stamp}c ${obj.constructor.name}`
 * 
 * Finally, to completely disable DEBUG without clearing each call in you code:
 * var DEBUG = window.DEBUG = o=>o
 * 
 */
var DEBUG = window.DEBUG = (ss,...args)=>{
	let type = 'log', stack
	,	str = Array.from(ss).map( (s,i)=>s+(args[i]!==undefined?'%':'') ).join('')
	,	res = str.match(/^([\w ]*)[|\n]/)
	//console.log( res )
	
	if( res )
    {
		let toks = res[1].split(' ')
		type = toks.filter(tok=>tok in console).pop() || type
		//console.log(toks)
		if( !toks.every(tok=>tok in DEBUG) ) return;
		str = str.replace( res[0], '' ).trim()
    }
	try{ throw new Error }catch(e)
	{
		stack = e.stack.split('\n').map(s=>s.match(/at\s(.*)/)).slice(2)
		.map( arr=> arr[1])
		//console.log(stack.slice(2))
	}
	console[type]( str, ...args, stack )
	return true
}
DEBUG.log = DEBUG.info = DEBUG.group = DEBUG.groupCollapsed =  DEBUG.groupEnd = DEBUG.error = DEBUG.table = true
//DEBUG.verbose = true
DEBUG = window.DEBUG = o=>o

//'verbose aze'.split(' ')
//	.map( s=> DEBUG[s.toLowerCase()] = (...a)=>DEBUG[s.toUpperCase()] && DEBUG(...a) )
//DEBUG.verbose = (...a)=>DEBUG.VERBOSE && DEBUG(...a)
//DEBUG.aze``

DEBUG.c = {
	stamp: `
		color: white;
		background: orange;
		font-weight:bold;
		text-shadow:0 -1px 0 rgba(0,0,0,0.6);
		box-shadow:0 1px 0 rgba(0,0,0,0.6);
		padding:0 4px;
	`
}
