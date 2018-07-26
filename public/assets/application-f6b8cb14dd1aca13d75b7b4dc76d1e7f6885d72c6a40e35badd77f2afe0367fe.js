/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*! jQuery v3.1.1 | (c) jQuery Foundation | jquery.org/license */

!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.1.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=r.isArray(d)))?(e?(e=!1,f=c&&r.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext,B=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,C=/^.[^:#\[\.,]*$/;function D(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):C.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(D(this,a||[],!1))},not:function(a){return this.pushStack(D(this,a||[],!0))},is:function(a){return!!D(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var E,F=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,G=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||E,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:F.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),B.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};G.prototype=r.fn,E=r(d);var H=/^(?:parents|prev(?:Until|All))/,I={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function J(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return J(a,"nextSibling")},prev:function(a){return J(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return a.contentDocument||r.merge([],a.childNodes)}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(I[a]||r.uniqueSort(e),H.test(a)&&e.reverse()),this.pushStack(e)}});var K=/[^\x20\t\r\n\f]+/g;function L(a){var b={};return r.each(a.match(K)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?L(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function M(a){return a}function N(a){throw a}function O(a,b,c){var d;try{a&&r.isFunction(d=a.promise)?d.call(a).done(b).fail(c):a&&r.isFunction(d=a.then)?d.call(a,b,c):b.call(void 0,a)}catch(a){c.call(void 0,a)}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,M,e),g(f,c,N,e)):(f++,j.call(a,g(f,c,M,e),g(f,c,N,e),g(f,c,M,c.notifyWith))):(d!==M&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==N&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:M,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:M)),c[2][3].add(g(0,a,r.isFunction(d)?d:N))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(O(a,g.done(h(c)).resolve,g.reject),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)O(e[c],h(c),g.reject);return g.promise()}});var P=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&P.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var Q=r.Deferred();r.fn.ready=function(a){return Q.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,holdReady:function(a){a?r.readyWait++:r.ready(!0)},ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||Q.resolveWith(d,[r]))}}),r.ready.then=Q.then;function R(){d.removeEventListener("DOMContentLoaded",R),
a.removeEventListener("load",R),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",R),a.addEventListener("load",R));var S=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)S(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},T=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function U(){this.expando=r.expando+U.uid++}U.uid=1,U.prototype={cache:function(a){var b=a[this.expando];return b||(b={},T(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){r.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(K)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var V=new U,W=new U,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Y=/[A-Z]/g;function Z(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:X.test(a)?JSON.parse(a):a)}function $(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Y,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=Z(c)}catch(e){}W.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return W.hasData(a)||V.hasData(a)},data:function(a,b,c){return W.access(a,b,c)},removeData:function(a,b){W.remove(a,b)},_data:function(a,b,c){return V.access(a,b,c)},_removeData:function(a,b){V.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=W.get(f),1===f.nodeType&&!V.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),$(f,d,e[d])));V.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){W.set(this,a)}):S(this,function(b){var c;if(f&&void 0===b){if(c=W.get(f,a),void 0!==c)return c;if(c=$(f,a),void 0!==c)return c}else this.each(function(){W.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){W.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=V.get(a,b),c&&(!d||r.isArray(c)?d=V.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return V.get(a,c)||V.access(a,c,{empty:r.Callbacks("once memory").add(function(){V.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=V.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var _=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,aa=new RegExp("^(?:([+-])=|)("+_+")([a-z%]*)$","i"),ba=["Top","Right","Bottom","Left"],ca=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function ea(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&aa.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var fa={};function ga(a){var b,c=a.ownerDocument,d=a.nodeName,e=fa[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),fa[d]=e,e)}function ha(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=V.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&ca(d)&&(e[f]=ga(d))):"none"!==c&&(e[f]="none",V.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ha(this,!0)},hide:function(){return ha(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){ca(this)?r(this).show():r(this).hide()})}});var ia=/^(?:checkbox|radio)$/i,ja=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ka=/^$|\/(?:java|ecma)script/i,la={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};la.optgroup=la.option,la.tbody=la.tfoot=la.colgroup=la.caption=la.thead,la.th=la.td;function ma(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&r.nodeName(a,b)?r.merge([a],c):c}function na(a,b){for(var c=0,d=a.length;c<d;c++)V.set(a[c],"globalEval",!b||V.get(b[c],"globalEval"))}var oa=/<|&#?\w+;/;function pa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(oa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ja.exec(f)||["",""])[1].toLowerCase(),i=la[h]||la._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=ma(l.appendChild(f),"script"),j&&na(g),c){k=0;while(f=g[k++])ka.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var qa=d.documentElement,ra=/^key/,sa=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ta=/^([^.]*)(?:\.(.+)|)/;function ua(){return!0}function va(){return!1}function wa(){try{return d.activeElement}catch(a){}}function xa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)xa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=va;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(qa,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;while(j--)h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.hasData(a)&&V.get(a);if(q&&(i=q.events)){b=(b||"").match(K)||[""],j=b.length;while(j--)if(h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&V.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(V.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==wa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===wa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&r.nodeName(this,"input"))return this.click(),!1},_default:function(a){return r.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ua:va,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:va,isPropagationStopped:va,isImmediatePropagationStopped:va,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ua,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ua,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ua,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&ra.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&sa.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return xa(this,a,b,c,d)},one:function(a,b,c,d){return xa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=va),this.each(function(){r.event.remove(this,a,c,b)})}});var ya=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,za=/<script|<style|<link/i,Aa=/checked\s*(?:[^=]|=\s*.checked.)/i,Ba=/^true\/(.*)/,Ca=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Da(a,b){return r.nodeName(a,"table")&&r.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function Ea(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Fa(a){var b=Ba.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ga(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(V.hasData(a)&&(f=V.access(a),g=V.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}W.hasData(a)&&(h=W.access(a),i=r.extend({},h),W.set(b,i))}}function Ha(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ia.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ia(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Aa.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ia(f,b,c,d)});if(m&&(e=pa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(ma(e,"script"),Ea),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,ma(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Fa),l=0;l<i;l++)j=h[l],ka.test(j.type||"")&&!V.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Ca,""),k))}return a}function Ja(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(ma(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&na(ma(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(ya,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=ma(h),f=ma(a),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);if(b)if(c)for(f=f||ma(a),g=g||ma(h),d=0,e=f.length;d<e;d++)Ga(f[d],g[d]);else Ga(a,h);return g=ma(h,"script"),g.length>0&&na(g,!i&&ma(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(T(c)){if(b=c[V.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[V.expando]=void 0}c[W.expando]&&(c[W.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ja(this,a,!0)},remove:function(a){return Ja(this,a)},text:function(a){return S(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.appendChild(a)}})},prepend:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(ma(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return S(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!za.test(a)&&!la[(ja.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(ma(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ia(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(ma(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var Ka=/^margin/,La=new RegExp("^("+_+")(?!px)[a-z%]+$","i"),Ma=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",qa.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,qa.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Na(a,b,c){var d,e,f,g,h=a.style;return c=c||Ma(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&La.test(g)&&Ka.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Oa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Pa=/^(none|table(?!-c[ea]).+)/,Qa={position:"absolute",visibility:"hidden",display:"block"},Ra={letterSpacing:"0",fontWeight:"400"},Sa=["Webkit","Moz","ms"],Ta=d.createElement("div").style;function Ua(a){if(a in Ta)return a;var b=a[0].toUpperCase()+a.slice(1),c=Sa.length;while(c--)if(a=Sa[c]+b,a in Ta)return a}function Va(a,b,c){var d=aa.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Wa(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ba[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ba[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ba[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ba[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ba[f]+"Width",!0,e)));return g}function Xa(a,b,c){var d,e=!0,f=Ma(a),g="border-box"===r.css(a,"boxSizing",!1,f);if(a.getClientRects().length&&(d=a.getBoundingClientRect()[b]),d<=0||null==d){if(d=Na(a,b,f),(d<0||null==d)&&(d=a.style[b]),La.test(d))return d;e=g&&(o.boxSizingReliable()||d===a.style[b]),d=parseFloat(d)||0}return d+Wa(a,b,c||(g?"border":"content"),e,f)+"px"}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Na(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=a.style;return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=aa.exec(c))&&e[1]&&(c=ea(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b);return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Na(a,b,d)),"normal"===e&&b in Ra&&(e=Ra[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Pa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?Xa(a,b,d):da(a,Qa,function(){return Xa(a,b,d)})},set:function(a,c,d){var e,f=d&&Ma(a),g=d&&Wa(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=aa.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Va(a,c,g)}}}),r.cssHooks.marginLeft=Oa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Na(a,"marginLeft"))||a.getBoundingClientRect().left-da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ba[d]+b]=f[d]||f[d-2]||f[0];return e}},Ka.test(a)||(r.cssHooks[a+b].set=Va)}),r.fn.extend({css:function(a,b){return S(this,function(a,b,c){var d,e,f={},g=0;if(r.isArray(b)){for(d=Ma(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function Ya(a,b,c,d,e){return new Ya.prototype.init(a,b,c,d,e)}r.Tween=Ya,Ya.prototype={constructor:Ya,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=Ya.propHooks[this.prop];return a&&a.get?a.get(this):Ya.propHooks._default.get(this)},run:function(a){var b,c=Ya.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ya.propHooks._default.set(this),this}},Ya.prototype.init.prototype=Ya.prototype,Ya.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},Ya.propHooks.scrollTop=Ya.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=Ya.prototype.init,r.fx.step={};var Za,$a,_a=/^(?:toggle|show|hide)$/,ab=/queueHooks$/;function bb(){$a&&(a.requestAnimationFrame(bb),r.fx.tick())}function cb(){return a.setTimeout(function(){Za=void 0}),Za=r.now()}function db(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ba[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function eb(a,b,c){for(var d,e=(hb.tweeners[b]||[]).concat(hb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function fb(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&ca(a),q=V.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],_a.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=V.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ha([a],!0),j=a.style.display||j,k=r.css(a,"display"),ha([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=V.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ha([a],!0),m.done(function(){p||ha([a]),V.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=eb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function gb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],r.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function hb(a,b,c){var d,e,f=0,g=hb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Za||cb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:Za||cb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(gb(k,j.opts.specialEasing);f<g;f++)if(d=hb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,eb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}r.Animation=r.extend(hb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return ea(c.elem,a,aa.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(K);for(var c,d=0,e=a.length;d<e;d++)c=a[d],hb.tweeners[c]=hb.tweeners[c]||[],hb.tweeners[c].unshift(b)},prefilters:[fb],prefilter:function(a,b){b?hb.prefilters.unshift(a):hb.prefilters.push(a)}}),r.speed=function(a,b,c){var e=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off||d.hidden?e.duration=0:"number"!=typeof e.duration&&(e.duration in r.fx.speeds?e.duration=r.fx.speeds[e.duration]:e.duration=r.fx.speeds._default),null!=e.queue&&e.queue!==!0||(e.queue="fx"),e.old=e.complete,e.complete=function(){r.isFunction(e.old)&&e.old.call(this),e.queue&&r.dequeue(this,e.queue)},e},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(ca).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=hb(this,r.extend({},a),f);(e||V.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=V.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&ab.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=V.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(db(b,!0),a,d,e)}}),r.each({slideDown:db("show"),slideUp:db("hide"),slideToggle:db("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(Za=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),Za=void 0},r.fx.timer=function(a){r.timers.push(a),a()?r.fx.start():r.timers.pop()},r.fx.interval=13,r.fx.start=function(){$a||($a=a.requestAnimationFrame?a.requestAnimationFrame(bb):a.setInterval(r.fx.tick,r.fx.interval))},r.fx.stop=function(){a.cancelAnimationFrame?a.cancelAnimationFrame($a):a.clearInterval($a),$a=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var ib,jb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return S(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?ib:void 0)),
void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&r.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(K);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),ib={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=jb[b]||r.find.attr;jb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=jb[g],jb[g]=e,e=null!=c(a,b,d)?g:null,jb[g]=f),e}});var kb=/^(?:input|select|textarea|button)$/i,lb=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return S(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):kb.test(a.nodeName)||lb.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function mb(a){var b=a.match(K)||[];return b.join(" ")}function nb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,nb(this)))});if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,nb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,nb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(K)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=nb(this),b&&V.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":V.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+mb(nb(c))+" ").indexOf(b)>-1)return!0;return!1}});var ob=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":r.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(ob,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:mb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!r.nodeName(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(r.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var pb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!pb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,pb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(V.get(h,"events")||{})[b.type]&&V.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&T(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!T(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=V.access(d,b);e||d.addEventListener(a,c,!0),V.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=V.access(d,b)-1;e?V.access(d,b,e):(d.removeEventListener(a,c,!0),V.remove(d,b))}}});var qb=a.location,rb=r.now(),sb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var tb=/\[\]$/,ub=/\r?\n/g,vb=/^(?:submit|button|image|reset|file)$/i,wb=/^(?:input|select|textarea|keygen)/i;function xb(a,b,c,d){var e;if(r.isArray(b))r.each(b,function(b,e){c||tb.test(a)?d(a,e):xb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)xb(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(r.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)xb(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&wb.test(this.nodeName)&&!vb.test(a)&&(this.checked||!ia.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:r.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(ub,"\r\n")}}):{name:b.name,value:c.replace(ub,"\r\n")}}).get()}});var yb=/%20/g,zb=/#.*$/,Ab=/([?&])_=[^&]*/,Bb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Cb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Db=/^(?:GET|HEAD)$/,Eb=/^\/\//,Fb={},Gb={},Hb="*/".concat("*"),Ib=d.createElement("a");Ib.href=qb.href;function Jb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Kb(a,b,c,d){var e={},f=a===Gb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Lb(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Mb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Nb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qb.href,type:"GET",isLocal:Cb.test(qb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Hb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Lb(Lb(a,r.ajaxSettings),b):Lb(r.ajaxSettings,a)},ajaxPrefilter:Jb(Fb),ajaxTransport:Jb(Gb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Bb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||qb.href)+"").replace(Eb,qb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(K)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Ib.protocol+"//"+Ib.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Kb(Fb,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Db.test(o.type),f=o.url.replace(zb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(yb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(sb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Ab,"$1"),n=(sb.test(f)?"&":"?")+"_="+rb++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Hb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Kb(Gb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Mb(o,y,d)),v=Nb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Ob={0:200,1223:204},Pb=r.ajaxSettings.xhr();o.cors=!!Pb&&"withCredentials"in Pb,o.ajax=Pb=!!Pb,r.ajaxTransport(function(b){var c,d;if(o.cors||Pb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Ob[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Qb=[],Rb=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Qb.pop()||r.expando+"_"+rb++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Rb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Rb.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Rb,"$1"+e):b.jsonp!==!1&&(b.url+=(sb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Qb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=B.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=pa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=mb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length};function Sb(a){return r.isWindow(a)?a:9===a.nodeType&&a.defaultView}r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),d.width||d.height?(e=f.ownerDocument,c=Sb(e),b=e.documentElement,{top:d.top+c.pageYOffset-b.clientTop,left:d.left+c.pageXOffset-b.clientLeft}):d):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),r.nodeName(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||qa})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return S(this,function(a,d,e){var f=Sb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Oa(o.pixelPosition,function(a,c){if(c)return c=Na(a,b),La.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return S(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.parseJSON=JSON.parse,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Tb=a.jQuery,Ub=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Ub),b&&a.jQuery===r&&(a.jQuery=Tb),r},b||(a.jQuery=a.$=r),r});
function dropdownEffectData(t){var e=null,n=null,i=$(t),o=$(".dropdown-menu",t),a=i.parents("ul.nav");return a.height>0&&(e=a.data("dropdown-in")||null,n=a.data("dropdown-out")||null),{target:t,dropdown:i,dropdownMenu:o,effectIn:o.data("dropdown-in")||e,effectOut:o.data("dropdown-out")||n}}function dropdownEffectStart(t,e){e&&(t.dropdown.addClass("dropdown-animating"),t.dropdownMenu.addClass("animated"),t.dropdownMenu.addClass(e))}function dropdownEffectEnd(t,e){t.dropdown.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){t.dropdown.removeClass("dropdown-animating"),t.dropdownMenu.removeClass("animated"),t.dropdownMenu.removeClass(t.effectIn),t.dropdownMenu.removeClass(t.effectOut),"function"==typeof e&&e()})}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(t,e,n,i,o){return jQuery.easing[jQuery.easing.def](t,e,n,i,o)},easeInQuad:function(t,e,n,i,o){return i*(e/=o)*e+n},easeOutQuad:function(t,e,n,i,o){return-i*(e/=o)*(e-2)+n},easeInOutQuad:function(t,e,n,i,o){return(e/=o/2)<1?i/2*e*e+n:-i/2*(--e*(e-2)-1)+n},easeInCubic:function(t,e,n,i,o){return i*(e/=o)*e*e+n},easeOutCubic:function(t,e,n,i,o){return i*((e=e/o-1)*e*e+1)+n},easeInOutCubic:function(t,e,n,i,o){return(e/=o/2)<1?i/2*e*e*e+n:i/2*((e-=2)*e*e+2)+n},easeInQuart:function(t,e,n,i,o){return i*(e/=o)*e*e*e+n},easeOutQuart:function(t,e,n,i,o){return-i*((e=e/o-1)*e*e*e-1)+n},easeInOutQuart:function(t,e,n,i,o){return(e/=o/2)<1?i/2*e*e*e*e+n:-i/2*((e-=2)*e*e*e-2)+n},easeInQuint:function(t,e,n,i,o){return i*(e/=o)*e*e*e*e+n},easeOutQuint:function(t,e,n,i,o){return i*((e=e/o-1)*e*e*e*e+1)+n},easeInOutQuint:function(t,e,n,i,o){return(e/=o/2)<1?i/2*e*e*e*e*e+n:i/2*((e-=2)*e*e*e*e+2)+n},easeInSine:function(t,e,n,i,o){return-i*Math.cos(e/o*(Math.PI/2))+i+n},easeOutSine:function(t,e,n,i,o){return i*Math.sin(e/o*(Math.PI/2))+n},easeInOutSine:function(t,e,n,i,o){return-i/2*(Math.cos(Math.PI*e/o)-1)+n},easeInExpo:function(t,e,n,i,o){return 0==e?n:i*Math.pow(2,10*(e/o-1))+n},easeOutExpo:function(t,e,n,i,o){return e==o?n+i:i*(1-Math.pow(2,-10*e/o))+n},easeInOutExpo:function(t,e,n,i,o){return 0==e?n:e==o?n+i:(e/=o/2)<1?i/2*Math.pow(2,10*(e-1))+n:i/2*(2-Math.pow(2,-10*--e))+n},easeInCirc:function(t,e,n,i,o){return-i*(Math.sqrt(1-(e/=o)*e)-1)+n},easeOutCirc:function(t,e,n,i,o){return i*Math.sqrt(1-(e=e/o-1)*e)+n},easeInOutCirc:function(t,e,n,i,o){return(e/=o/2)<1?-i/2*(Math.sqrt(1-e*e)-1)+n:i/2*(Math.sqrt(1-(e-=2)*e)+1)+n},easeInElastic:function(t,e,n,i,o){var a=1.70158,r=0,s=i;if(0==e)return n;if(1==(e/=o))return n+i;if(r||(r=.3*o),s<Math.abs(i)){s=i;var a=r/4}else var a=r/(2*Math.PI)*Math.asin(i/s);return-(s*Math.pow(2,10*(e-=1))*Math.sin((e*o-a)*(2*Math.PI)/r))+n},easeOutElastic:function(t,e,n,i,o){var a=1.70158,r=0,s=i;if(0==e)return n;if(1==(e/=o))return n+i;if(r||(r=.3*o),s<Math.abs(i)){s=i;var a=r/4}else var a=r/(2*Math.PI)*Math.asin(i/s);return s*Math.pow(2,-10*e)*Math.sin((e*o-a)*(2*Math.PI)/r)+i+n},easeInOutElastic:function(t,e,n,i,o){var a=1.70158,r=0,s=i;if(0==e)return n;if(2==(e/=o/2))return n+i;if(r||(r=o*(.3*1.5)),s<Math.abs(i)){s=i;var a=r/4}else var a=r/(2*Math.PI)*Math.asin(i/s);return e<1?-.5*(s*Math.pow(2,10*(e-=1))*Math.sin((e*o-a)*(2*Math.PI)/r))+n:s*Math.pow(2,-10*(e-=1))*Math.sin((e*o-a)*(2*Math.PI)/r)*.5+i+n},easeInBack:function(t,e,n,i,o,a){return void 0==a&&(a=1.70158),i*(e/=o)*e*((a+1)*e-a)+n},easeOutBack:function(t,e,n,i,o,a){return void 0==a&&(a=1.70158),i*((e=e/o-1)*e*((a+1)*e+a)+1)+n},easeInOutBack:function(t,e,n,i,o,a){return void 0==a&&(a=1.70158),(e/=o/2)<1?i/2*(e*e*((1+(a*=1.525))*e-a))+n:i/2*((e-=2)*e*((1+(a*=1.525))*e+a)+2)+n},easeInBounce:function(t,e,n,i,o){return i-jQuery.easing.easeOutBounce(t,o-e,0,i,o)+n},easeOutBounce:function(t,e,n,i,o){return(e/=o)<1/2.75?i*(7.5625*e*e)+n:e<2/2.75?i*(7.5625*(e-=1.5/2.75)*e+.75)+n:e<2.5/2.75?i*(7.5625*(e-=2.25/2.75)*e+.9375)+n:i*(7.5625*(e-=2.625/2.75)*e+.984375)+n},easeInOutBounce:function(t,e,n,i,o){return e<o/2?.5*jQuery.easing.easeInBounce(t,2*e,0,i,o)+n:.5*jQuery.easing.easeOutBounce(t,2*e-o,0,i,o)+.5*i+n}}),jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(function(t){function e(t){var e=t.length,i=n.type(t);return"function"!==i&&!n.isWindow(t)&&(!(1!==t.nodeType||!e)||("array"===i||0===e||"number"==typeof e&&e>0&&e-1 in t))}if(!t.jQuery){var n=function(t,e){return new n.fn.init(t,e)};n.isWindow=function(t){return null!=t&&t==t.window},n.type=function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?o[r.call(t)]||"object":typeof t},n.isArray=Array.isArray||function(t){return"array"===n.type(t)},n.isPlainObject=function(t){var e;if(!t||"object"!==n.type(t)||t.nodeType||n.isWindow(t))return!1;try{if(t.constructor&&!a.call(t,"constructor")&&!a.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}for(e in t);return void 0===e||a.call(t,e)},n.each=function(t,n,i){var o=0,a=t.length,r=e(t);if(i){if(r)for(;a>o&&n.apply(t[o],i)!==!1;o++);else for(o in t)if(n.apply(t[o],i)===!1)break}else if(r)for(;a>o&&n.call(t[o],o,t[o])!==!1;o++);else for(o in t)if(n.call(t[o],o,t[o])===!1)break;return t},n.data=function(t,e,o){if(void 0===o){var a=t[n.expando],r=a&&i[a];if(void 0===e)return r;if(r&&e in r)return r[e]}else if(void 0!==e){var a=t[n.expando]||(t[n.expando]=++n.uuid);return i[a]=i[a]||{},i[a][e]=o,o}},n.removeData=function(t,e){var o=t[n.expando],a=o&&i[o];a&&n.each(e,function(t,e){delete a[e]})},n.extend=function(){var t,e,i,o,a,r,s=arguments[0]||{},l=1,c=arguments.length,u=!1;for("boolean"==typeof s&&(u=s,s=arguments[l]||{},l++),"object"!=typeof s&&"function"!==n.type(s)&&(s={}),l===c&&(s=this,l--);c>l;l++)if(null!=(a=arguments[l]))for(o in a)t=s[o],i=a[o],s!==i&&(u&&i&&(n.isPlainObject(i)||(e=n.isArray(i)))?(e?(e=!1,r=t&&n.isArray(t)?t:[]):r=t&&n.isPlainObject(t)?t:{},s[o]=n.extend(u,r,i)):void 0!==i&&(s[o]=i));return s},n.queue=function(t,i,o){if(t){i=(i||"fx")+"queue";var a=n.data(t,i);return o?(!a||n.isArray(o)?a=n.data(t,i,function(t,n){var i=n||[];return null!=t&&(e(Object(t))?function(t,e){for(var n=+e.length,i=0,o=t.length;n>i;)t[o++]=e[i++];if(n!==n)for(;void 0!==e[i];)t[o++]=e[i++];t.length=o,t}(i,"string"==typeof t?[t]:t):[].push.call(i,t)),i}(o)):a.push(o),a):a||[]}},n.dequeue=function(t,e){n.each(t.nodeType?[t]:t,function(t,i){e=e||"fx";var o=n.queue(i,e),a=o.shift();"inprogress"===a&&(a=o.shift()),a&&("fx"===e&&o.unshift("inprogress"),a.call(i,function(){n.dequeue(i,e)}))})},n.fn=n.prototype={init:function(t){if(t.nodeType)return this[0]=t,this;throw new Error("Not a DOM node.")},offset:function(){var e=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:e.top+(t.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:e.left+(t.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function t(){for(var t=this.offsetParent||document;t&&"html"===!t.nodeType.toLowerCase&&"static"===t.style.position;)t=t.offsetParent;return t||document}var e=this[0],t=t.apply(e),i=this.offset(),o=/^(?:body|html)$/i.test(t.nodeName)?{top:0,left:0}:n(t).offset();return i.top-=parseFloat(e.style.marginTop)||0,i.left-=parseFloat(e.style.marginLeft)||0,t.style&&(o.top+=parseFloat(t.style.borderTopWidth)||0,o.left+=parseFloat(t.style.borderLeftWidth)||0),{top:i.top-o.top,left:i.left-o.left}}};var i={};n.expando="velocity"+(new Date).getTime(),n.uuid=0;for(var o={},a=o.hasOwnProperty,r=o.toString,s="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<s.length;l++)o["[object "+s[l]+"]"]=s[l].toLowerCase();n.fn.init.prototype=n.fn,t.Velocity={Utilities:n}}}(window),function(t){"object"==typeof module&&"object"==typeof module.exports?module.exports=t():"function"==typeof define&&define.amd?define(t):t()}(function(){return function(t,e,n,i){function o(t){for(var e=-1,n=t?t.length:0,i=[];++e<n;){var o=t[e];o&&i.push(o)}return i}function a(t){return m.isWrapped(t)?t=[].slice.call(t):m.isNode(t)&&(t=[t]),t}function r(t){var e=h.data(t,"velocity");return null===e?i:e}function s(t){return function(e){return Math.round(e*t)*(1/t)}}function l(t,n,i,o){function a(t,e){return 1-3*e+3*t}function r(t,e){return 3*e-6*t}function s(t){return 3*t}function l(t,e,n){return((a(e,n)*t+r(e,n))*t+s(e))*t}function c(t,e,n){return 3*a(e,n)*t*t+2*r(e,n)*t+s(e)}function u(e,n){for(var o=0;m>o;++o){var a=c(n,t,i);if(0===a)return n;n-=(l(n,t,i)-e)/a}return n}function d(){for(var e=0;b>e;++e)C[e]=l(e*x,t,i)}function h(e,n,o){var a,r,s=0;do{r=n+(o-n)/2,a=l(r,t,i)-e,a>0?o=r:n=r}while(Math.abs(a)>v&&++s<y);return r}function p(e){for(var n=0,o=1,a=b-1;o!=a&&C[o]<=e;++o)n+=x;--o;var r=(e-C[o])/(C[o+1]-C[o]),s=n+r*x,l=c(s,t,i);return l>=g?u(e,s):0==l?s:h(e,n,n+x)}function f(){S=!0,(t!=n||i!=o)&&d()}var m=4,g=.001,v=1e-7,y=10,b=11,x=1/(b-1),w="Float32Array"in e;if(4!==arguments.length)return!1;for(var k=0;4>k;++k)if("number"!=typeof arguments[k]||isNaN(arguments[k])||!isFinite(arguments[k]))return!1;t=Math.min(t,1),i=Math.min(i,1),t=Math.max(t,0),i=Math.max(i,0);var C=w?new Float32Array(b):new Array(b),S=!1,T=function(e){return S||f(),t===n&&i===o?e:0===e?0:1===e?1:l(p(e),n,o)};T.getControlPoints=function(){return[{x:t,y:n},{x:i,y:o}]};var M="generateBezier("+[t,n,i,o]+")";return T.toString=function(){return M},T}function c(t,e){var n=t;return m.isString(t)?b.Easings[t]||(n=!1):n=m.isArray(t)&&1===t.length?s.apply(null,t):m.isArray(t)&&2===t.length?x.apply(null,t.concat([e])):!(!m.isArray(t)||4!==t.length)&&l.apply(null,t),n===!1&&(n=b.Easings[b.defaults.easing]?b.defaults.easing:y),n}function u(t){if(t){var e=(new Date).getTime(),n=b.State.calls.length;n>1e4&&(b.State.calls=o(b.State.calls));for(var a=0;n>a;a++)if(b.State.calls[a]){var s=b.State.calls[a],l=s[0],c=s[2],p=s[3],f=!!p,g=null;p||(p=b.State.calls[a][3]=e-16);for(var v=Math.min((e-p)/c.duration,1),y=0,x=l.length;x>y;y++){var k=l[y],S=k.element;if(r(S)){var T=!1;if(c.display!==i&&null!==c.display&&"none"!==c.display){if("flex"===c.display){var M=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];h.each(M,function(t,e){w.setPropertyValue(S,"display",e)})}w.setPropertyValue(S,"display",c.display)}c.visibility!==i&&"hidden"!==c.visibility&&w.setPropertyValue(S,"visibility",c.visibility);for(var I in k)if("element"!==I){var A,P=k[I],D=m.isString(P.easing)?b.Easings[P.easing]:P.easing;if(1===v)A=P.endValue;else{var _=P.endValue-P.startValue;if(A=P.startValue+_*D(v,c,_),!f&&A===P.currentValue)continue}if(P.currentValue=A,"tween"===I)g=A;else{if(w.Hooks.registered[I]){var E=w.Hooks.getRoot(I),O=r(S).rootPropertyValueCache[E];O&&(P.rootPropertyValue=O)}var L=w.setPropertyValue(S,I,P.currentValue+(0===parseFloat(A)?"":P.unitType),P.rootPropertyValue,P.scrollData);w.Hooks.registered[I]&&(r(S).rootPropertyValueCache[E]=w.Normalizations.registered[E]?w.Normalizations.registered[E]("extract",null,L[1]):L[1]),"transform"===L[0]&&(T=!0)}}c.mobileHA&&r(S).transformCache.translate3d===i&&(r(S).transformCache.translate3d="(0px, 0px, 0px)",T=!0),T&&w.flushTransformCache(S)}}c.display!==i&&"none"!==c.display&&(b.State.calls[a][2].display=!1),c.visibility!==i&&"hidden"!==c.visibility&&(b.State.calls[a][2].visibility=!1),c.progress&&c.progress.call(s[1],s[1],v,Math.max(0,p+c.duration-e),p,g),1===v&&d(a)}}b.State.isTicking&&C(u)}function d(t,e){if(!b.State.calls[t])return!1;for(var n=b.State.calls[t][0],o=b.State.calls[t][1],a=b.State.calls[t][2],s=b.State.calls[t][4],l=!1,c=0,u=n.length;u>c;c++){var d=n[c].element;if(e||a.loop||("none"===a.display&&w.setPropertyValue(d,"display",a.display),"hidden"===a.visibility&&w.setPropertyValue(d,"visibility",a.visibility)),a.loop!==!0&&(h.queue(d)[1]===i||!/\.velocityQueueEntryFlag/i.test(h.queue(d)[1]))&&r(d)){r(d).isAnimating=!1,r(d).rootPropertyValueCache={};var p=!1;h.each(w.Lists.transforms3D,function(t,e){var n=/^scale/.test(e)?1:0,o=r(d).transformCache[e];r(d).transformCache[e]!==i&&new RegExp("^\\("+n+"[^.]").test(o)&&(p=!0,delete r(d).transformCache[e])}),a.mobileHA&&(p=!0,delete r(d).transformCache.translate3d),p&&w.flushTransformCache(d),w.Values.removeClass(d,"velocity-animating")}if(!e&&a.complete&&!a.loop&&c===u-1)try{a.complete.call(o,o)}catch(t){setTimeout(function(){throw t},1)}s&&a.loop!==!0&&s(o),r(d)&&a.loop===!0&&!e&&(h.each(r(d).tweensContainer,function(t,e){/^rotate/.test(t)&&360===parseFloat(e.endValue)&&(e.endValue=0,e.startValue=360),/^backgroundPosition/.test(t)&&100===parseFloat(e.endValue)&&"%"===e.unitType&&(e.endValue=0,e.startValue=100)}),b(d,"reverse",{loop:!0,delay:a.delay})),a.queue!==!1&&h.dequeue(d,a.queue)}b.State.calls[t]=!1;for(var f=0,m=b.State.calls.length;m>f;f++)if(b.State.calls[f]!==!1){l=!0;break}l===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var h,p=function(){if(n.documentMode)return n.documentMode;for(var t=7;t>4;t--){var e=n.createElement("div");if(e.innerHTML="<!--[if IE "+t+"]><span></span><![endif]-->",e.getElementsByTagName("span").length)return e=null,t}return i}(),f=function(){var t=0;return e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||function(e){var n,i=(new Date).getTime();return n=Math.max(0,16-(i-t)),t=i+n,setTimeout(function(){e(i+n)},n)}}(),m={isString:function(t){return"string"==typeof t},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},isFunction:function(t){return"[object Function]"===Object.prototype.toString.call(t)},isNode:function(t){return t&&t.nodeType},isNodeList:function(t){return"object"==typeof t&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(t))&&t.length!==i&&(0===t.length||"object"==typeof t[0]&&t[0].nodeType>0)},isWrapped:function(t){return t&&(t.jquery||e.Zepto&&e.Zepto.zepto.isZ(t))},isSVG:function(t){return e.SVGElement&&t instanceof e.SVGElement},isEmptyObject:function(t){for(var e in t)return!1;return!0}},g=!1;if(t.fn&&t.fn.jquery?(h=t,g=!0):h=e.Velocity.Utilities,8>=p&&!g)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=p)return void(jQuery.fn.velocity=jQuery.fn.animate);var v=400,y="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:e.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:n.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:h,Redirects:{},Easings:{},Promise:e.Promise,defaults:{queue:"",duration:v,easing:y,begin:i,complete:i,progress:i,display:i,visibility:i,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(t){h.data(t,"velocity",{isSVG:m.isSVG(t),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};e.pageYOffset!==i?(b.State.scrollAnchor=e,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=n.documentElement||n.body.parentNode||n.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop");var x=function(){function t(t){return-t.tension*t.x-t.friction*t.v}function e(e,n,i){var o={x:e.x+i.dx*n,v:e.v+i.dv*n,tension:e.tension,friction:e.friction};return{dx:o.v,dv:t(o)}}function n(n,i){var o={dx:n.v,dv:t(n)},a=e(n,.5*i,o),r=e(n,.5*i,a),s=e(n,i,r),l=1/6*(o.dx+2*(a.dx+r.dx)+s.dx),c=1/6*(o.dv+2*(a.dv+r.dv)+s.dv);return n.x=n.x+l*i,n.v=n.v+c*i,n}return function t(e,i,o){var a,r,s,l={x:-1,v:0,tension:null,friction:null},c=[0],u=0;for(e=parseFloat(e)||500,i=parseFloat(i)||20,o=o||null,l.tension=e,l.friction=i,a=null!==o,a?(u=t(e,i),r=u/o*.016):r=.016;s=n(s||l,r),c.push(1+s.x),u+=16,Math.abs(s.x)>1e-4&&Math.abs(s.v)>1e-4;);return a?function(t){return c[t*(c.length-1)|0]}:u}}();b.Easings={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2},spring:function(t){return 1-Math.cos(4.5*t*Math.PI)*Math.exp(6*-t)}},h.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(t,e){b.Easings[e[0]]=l.apply(null,e[1])});var w=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var t=0;t<w.Lists.colors.length;t++){var e="color"===w.Lists.colors[t]?"0 0 0 1":"255 255 255 1";w.Hooks.templates[w.Lists.colors[t]]=["Red Green Blue Alpha",e]}var n,i,o;if(p)for(n in w.Hooks.templates){i=w.Hooks.templates[n],o=i[0].split(" ");var a=i[1].match(w.RegEx.valueSplit);"Color"===o[0]&&(o.push(o.shift()),a.push(a.shift()),w.Hooks.templates[n]=[o.join(" "),a.join(" ")])}for(n in w.Hooks.templates){i=w.Hooks.templates[n],o=i[0].split(" ");for(var t in o){var r=n+o[t],s=t;w.Hooks.registered[r]=[n,s]}}},getRoot:function(t){var e=w.Hooks.registered[t];return e?e[0]:t},cleanRootPropertyValue:function(t,e){return w.RegEx.valueUnwrap.test(e)&&(e=e.match(w.RegEx.valueUnwrap)[1]),w.Values.isCSSNullValue(e)&&(e=w.Hooks.templates[t][1]),e},extractValue:function(t,e){var n=w.Hooks.registered[t];if(n){var i=n[0],o=n[1];return e=w.Hooks.cleanRootPropertyValue(i,e),e.toString().match(w.RegEx.valueSplit)[o]}return e},injectValue:function(t,e,n){var i=w.Hooks.registered[t];if(i){var o,a=i[0],r=i[1];return n=w.Hooks.cleanRootPropertyValue(a,n),o=n.toString().match(w.RegEx.valueSplit),o[r]=e,o.join(" ")}return n}},Normalizations:{registered:{clip:function(t,e,n){switch(t){case"name":return"clip";case"extract":var i;return w.RegEx.wrappedValueAlreadyExtracted.test(n)?i=n:(i=n.toString().match(w.RegEx.valueUnwrap),i=i?i[1].replace(/,(\s+)?/g," "):n),i;case"inject":return"rect("+n+")"}},blur:function(t,e,n){switch(t){case"name":return b.State.isFirefox?"filter":"-webkit-filter";case"extract":var i=parseFloat(n);if(!i&&0!==i){var o=n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);i=o?o[1]:0}return i;case"inject":return parseFloat(n)?"blur("+n+")":"none"}},opacity:function(t,e,n){if(8>=p)switch(t){case"name":return"filter";case"extract":var i=n.toString().match(/alpha\(opacity=(.*)\)/i);return n=i?i[1]/100:1;case"inject":return e.style.zoom=1,parseFloat(n)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(n),10)+")"}else switch(t){case"name":return"opacity";case"extract":return n;case"inject":return n}}},register:function(){9>=p||b.State.isGingerbread||(w.Lists.transformsBase=w.Lists.transformsBase.concat(w.Lists.transforms3D));for(var t=0;t<w.Lists.transformsBase.length;t++)!function(){var e=w.Lists.transformsBase[t];w.Normalizations.registered[e]=function(t,n,o){switch(t){case"name":return"transform";case"extract":return r(n)===i||r(n).transformCache[e]===i?/^scale/i.test(e)?1:0:r(n).transformCache[e].replace(/[()]/g,"");case"inject":var a=!1;switch(e.substr(0,e.length-1)){case"translate":a=!/(%|px|em|rem|vw|vh|\d)$/i.test(o);break;case"scal":case"scale":b.State.isAndroid&&r(n).transformCache[e]===i&&1>o&&(o=1),a=!/(\d)$/i.test(o);break;case"skew":a=!/(deg|\d)$/i.test(o);break;case"rotate":a=!/(deg|\d)$/i.test(o)}return a||(r(n).transformCache[e]="("+o+")"),r(n).transformCache[e]}}}();for(var t=0;t<w.Lists.colors.length;t++)!function(){var e=w.Lists.colors[t];w.Normalizations.registered[e]=function(t,n,o){switch(t){case"name":return e;case"extract":var a;if(w.RegEx.wrappedValueAlreadyExtracted.test(o))a=o;else{var r,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(o)?r=s[o]!==i?s[o]:s.black:w.RegEx.isHex.test(o)?r="rgb("+w.Values.hexToRgb(o).join(" ")+")":/^rgba?\(/i.test(o)||(r=s.black),a=(r||o).toString().match(w.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=p||3!==a.split(" ").length||(a+=" 1"),a;case"inject":return 8>=p?4===o.split(" ").length&&(o=o.split(/\s+/).slice(0,3).join(" ")):3===o.split(" ").length&&(o+=" 1"),(8>=p?"rgb":"rgba")+"("+o.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(t){return t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})},SVGAttribute:function(t){var e="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(p||b.State.isAndroid&&!b.State.isChrome)&&(e+="|transform"),new RegExp("^("+e+")$","i").test(t)},prefixCheck:function(t){if(b.State.prefixMatches[t])return[b.State.prefixMatches[t],!0];for(var e=["","Webkit","Moz","ms","O"],n=0,i=e.length;i>n;n++){var o;if(o=0===n?t:e[n]+t.replace(/^\w/,function(t){return t.toUpperCase()}),m.isString(b.State.prefixElement.style[o]))return b.State.prefixMatches[t]=o,[o,!0]}return[t,!1]}},Values:{hexToRgb:function(t){var e,n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(t,e,n,i){return e+e+n+n+i+i}),e=n.exec(t),e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:[0,0,0]},isCSSNullValue:function(t){return 0==t||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(t)},getUnitType:function(t){return/^(rotate|skew)/i.test(t)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(t)?"":"px"},getDisplayType:function(t){var e=t&&t.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(e)?"inline":/^(li)$/i.test(e)?"list-item":/^(tr)$/i.test(e)?"table-row":/^(table)$/i.test(e)?"table":/^(tbody)$/i.test(e)?"table-row-group":"block"},addClass:function(t,e){t.classList?t.classList.add(e):t.className+=(t.className.length?" ":"")+e},removeClass:function(t,e){t.classList?t.classList.remove(e):t.className=t.className.toString().replace(new RegExp("(^|\\s)"+e.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(t,n,o,a){function s(t,n){function o(){c&&w.setPropertyValue(t,"display","none")}var l=0;if(8>=p)l=h.css(t,n);else{var c=!1;if(/^(width|height)$/.test(n)&&0===w.getPropertyValue(t,"display")&&(c=!0,w.setPropertyValue(t,"display",w.Values.getDisplayType(t))),!a){if("height"===n&&"border-box"!==w.getPropertyValue(t,"boxSizing").toString().toLowerCase()){var u=t.offsetHeight-(parseFloat(w.getPropertyValue(t,"borderTopWidth"))||0)-(parseFloat(w.getPropertyValue(t,"borderBottomWidth"))||0)-(parseFloat(w.getPropertyValue(t,"paddingTop"))||0)-(parseFloat(w.getPropertyValue(t,"paddingBottom"))||0);return o(),u}if("width"===n&&"border-box"!==w.getPropertyValue(t,"boxSizing").toString().toLowerCase()){var d=t.offsetWidth-(parseFloat(w.getPropertyValue(t,"borderLeftWidth"))||0)-(parseFloat(w.getPropertyValue(t,"borderRightWidth"))||0)-(parseFloat(w.getPropertyValue(t,"paddingLeft"))||0)-(parseFloat(w.getPropertyValue(t,"paddingRight"))||0);return o(),d}}var f;f=r(t)===i?e.getComputedStyle(t,null):r(t).computedStyle?r(t).computedStyle:r(t).computedStyle=e.getComputedStyle(t,null),"borderColor"===n&&(n="borderTopColor"),l=9===p&&"filter"===n?f.getPropertyValue(n):f[n],(""===l||null===l)&&(l=t.style[n]),o()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(n)){var m=s(t,"position");("fixed"===m||"absolute"===m&&/top|left/i.test(n))&&(l=h(t).position()[n]+"px")}return l}var l;if(w.Hooks.registered[n]){var c=n,u=w.Hooks.getRoot(c);o===i&&(o=w.getPropertyValue(t,w.Names.prefixCheck(u)[0])),w.Normalizations.registered[u]&&(o=w.Normalizations.registered[u]("extract",t,o)),l=w.Hooks.extractValue(c,o)}else if(w.Normalizations.registered[n]){var d,f;d=w.Normalizations.registered[n]("name",t),"transform"!==d&&(f=s(t,w.Names.prefixCheck(d)[0]),w.Values.isCSSNullValue(f)&&w.Hooks.templates[n]&&(f=w.Hooks.templates[n][1])),l=w.Normalizations.registered[n]("extract",t,f)}if(!/^[\d-]/.test(l))if(r(t)&&r(t).isSVG&&w.Names.SVGAttribute(n))if(/^(height|width)$/i.test(n))try{l=t.getBBox()[n]}catch(t){l=0}else l=t.getAttribute(n);else l=s(t,w.Names.prefixCheck(n)[0]);return w.Values.isCSSNullValue(l)&&(l=0),b.debug>=2&&console.log("Get "+n+": "+l),l},setPropertyValue:function(t,n,i,o,a){var s=n;if("scroll"===n)a.container?a.container["scroll"+a.direction]=i:"Left"===a.direction?e.scrollTo(i,a.alternateValue):e.scrollTo(a.alternateValue,i);else if(w.Normalizations.registered[n]&&"transform"===w.Normalizations.registered[n]("name",t))w.Normalizations.registered[n]("inject",t,i),s="transform",i=r(t).transformCache[n];else{if(w.Hooks.registered[n]){var l=n,c=w.Hooks.getRoot(n);o=o||w.getPropertyValue(t,c),i=w.Hooks.injectValue(l,i,o),n=c}if(w.Normalizations.registered[n]&&(i=w.Normalizations.registered[n]("inject",t,i),n=w.Normalizations.registered[n]("name",t)),s=w.Names.prefixCheck(n)[0],8>=p)try{t.style[s]=i}catch(t){b.debug&&console.log("Browser does not support ["+i+"] for ["+s+"]")}else r(t)&&r(t).isSVG&&w.Names.SVGAttribute(n)?t.setAttribute(n,i):t.style[s]=i;b.debug>=2&&console.log("Set "+n+" ("+s+"): "+i)}return[s,i]},flushTransformCache:function(t){function e(e){return parseFloat(w.getPropertyValue(t,e))}var n="";if((p||b.State.isAndroid&&!b.State.isChrome)&&r(t).isSVG){var i={translate:[e("translateX"),e("translateY")],skewX:[e("skewX")],skewY:[e("skewY")],scale:1!==e("scale")?[e("scale"),e("scale")]:[e("scaleX"),e("scaleY")],rotate:[e("rotateZ"),0,0]};h.each(r(t).transformCache,function(t){/^translate/i.test(t)?t="translate":/^scale/i.test(t)?t="scale":/^rotate/i.test(t)&&(t="rotate"),i[t]&&(n+=t+"("+i[t].join(" ")+") ",delete i[t])})}else{var o,a;h.each(r(t).transformCache,function(e){return o=r(t).transformCache[e],"transformPerspective"===e?(a=o,!0):(9===p&&"rotateZ"===e&&(e="rotate"),void(n+=e+o+" "))}),a&&(n="perspective"+a+" "+n)}w.setPropertyValue(t,"transform",n)}};w.Hooks.register(),w.Normalizations.register(),b.hook=function(t,e,n){var o=i;return t=a(t),h.each(t,function(t,a){if(r(a)===i&&b.init(a),n===i)o===i&&(o=b.CSS.getPropertyValue(a,e));else{var s=b.CSS.setPropertyValue(a,e,n);"transform"===s[0]&&b.CSS.flushTransformCache(a),o=s}}),o};var k=function(){function t(){return s?I.promise||null:l}function o(){function t(t){function d(t,e){var n=i,o=i,r=i;return m.isArray(t)?(n=t[0],!m.isArray(t[1])&&/^[\d-]/.test(t[1])||m.isFunction(t[1])||w.RegEx.isHex.test(t[1])?r=t[1]:(m.isString(t[1])&&!w.RegEx.isHex.test(t[1])||m.isArray(t[1]))&&(o=e?t[1]:c(t[1],s.duration),t[2]!==i&&(r=t[2]))):n=t,e||(o=o||s.easing),m.isFunction(n)&&(n=n.call(a,S,C)),m.isFunction(r)&&(r=r.call(a,S,C)),[n||0,o,r]}function p(t,e){var n,i;return i=(e||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(t){return n=t,""}),n||(n=w.Values.getUnitType(t)),[i,n]}if(s.begin&&0===S)try{s.begin.call(f,f)}catch(t){setTimeout(function(){throw t},1)}if("scroll"===A){var v,x,k,T=/^x$/i.test(s.axis)?"Left":"Top",M=parseFloat(s.offset)||0;s.container?m.isWrapped(s.container)||m.isNode(s.container)?(s.container=s.container[0]||s.container,v=s.container["scroll"+T],k=v+h(a).position()[T.toLowerCase()]+M):s.container=null:(v=b.State.scrollAnchor[b.State["scrollProperty"+T]],x=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===T?"Top":"Left")]],k=h(a).offset()[T.toLowerCase()]+M),l={scroll:{rootPropertyValue:!1,startValue:v,currentValue:v,endValue:k,unitType:"",easing:s.easing,scrollData:{container:s.container,direction:T,alternateValue:x}},element:a},b.debug&&console.log("tweensContainer (scroll): ",l.scroll,a)}else if("reverse"===A){if(!r(a).tweensContainer)return void h.dequeue(a,s.queue);"none"===r(a).opts.display&&(r(a).opts.display="auto"),"hidden"===r(a).opts.visibility&&(r(a).opts.visibility="visible"),r(a).opts.loop=!1,r(a).opts.begin=null,r(a).opts.complete=null,y.easing||delete s.easing,y.duration||delete s.duration,s=h.extend({},r(a).opts,s);var P=h.extend(!0,{},r(a).tweensContainer);for(var D in P)if("element"!==D){var _=P[D].startValue;P[D].startValue=P[D].currentValue=P[D].endValue,P[D].endValue=_,m.isEmptyObject(y)||(P[D].easing=s.easing),b.debug&&console.log("reverse tweensContainer ("+D+"): "+JSON.stringify(P[D]),a)}l=P}else if("start"===A){var P;r(a).tweensContainer&&r(a).isAnimating===!0&&(P=r(a).tweensContainer),h.each(g,function(t,e){if(RegExp("^"+w.Lists.colors.join("$|^")+"$").test(t)){var n=d(e,!0),o=n[0],a=n[1],r=n[2];if(w.RegEx.isHex.test(o)){for(var s=["Red","Green","Blue"],l=w.Values.hexToRgb(o),c=r?w.Values.hexToRgb(r):i,u=0;u<s.length;u++){var h=[l[u]];a&&h.push(a),c!==i&&h.push(c[u]),g[t+s[u]]=h}delete g[t]}}});for(var E in g){var O=d(g[E]),R=O[0],W=O[1],V=O[2];E=w.Names.camelCase(E);var z=w.Hooks.getRoot(E),N=!1;if(r(a).isSVG||"tween"===z||w.Names.prefixCheck(z)[1]!==!1||w.Normalizations.registered[z]!==i){(s.display!==i&&null!==s.display&&"none"!==s.display||s.visibility!==i&&"hidden"!==s.visibility)&&/opacity|filter/.test(E)&&!V&&0!==R&&(V=0),s._cacheValues&&P&&P[E]?(V===i&&(V=P[E].endValue+P[E].unitType),N=r(a).rootPropertyValueCache[z]):w.Hooks.registered[E]?V===i?(N=w.getPropertyValue(a,z),V=w.getPropertyValue(a,E,N)):N=w.Hooks.templates[z][1]:V===i&&(V=w.getPropertyValue(a,E));var H,B,Y,j=!1;if(H=p(E,V),V=H[0],Y=H[1],H=p(E,R),R=H[0].replace(/^([+-\/*])=/,function(t,e){return j=e,""}),B=H[1],V=parseFloat(V)||0,R=parseFloat(R)||0,"%"===B&&(/^(fontSize|lineHeight)$/.test(E)?(R/=100,B="em"):/^scale/.test(E)?(R/=100,B=""):/(Red|Green|Blue)$/i.test(E)&&(R=R/100*255,B="")),/[\/*]/.test(j))B=Y;else if(Y!==B&&0!==V)if(0===R)B=Y;else{o=o||function(){var t={myParent:a.parentNode||n.body,position:w.getPropertyValue(a,"position"),fontSize:w.getPropertyValue(a,"fontSize")},i=t.position===L.lastPosition&&t.myParent===L.lastParent,o=t.fontSize===L.lastFontSize;L.lastParent=t.myParent,L.lastPosition=t.position,L.lastFontSize=t.fontSize;var s=100,l={};if(o&&i)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var c=r(a).isSVG?n.createElementNS("http://www.w3.org/2000/svg","rect"):n.createElement("div");b.init(c),t.myParent.appendChild(c),h.each(["overflow","overflowX","overflowY"],function(t,e){b.CSS.setPropertyValue(c,e,"hidden")}),b.CSS.setPropertyValue(c,"position",t.position),b.CSS.setPropertyValue(c,"fontSize",t.fontSize),b.CSS.setPropertyValue(c,"boxSizing","content-box"),h.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(t,e){b.CSS.setPropertyValue(c,e,s+"%")}),b.CSS.setPropertyValue(c,"paddingLeft",s+"em"),
l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(w.getPropertyValue(c,"width",null,!0))||1)/s,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(w.getPropertyValue(c,"height",null,!0))||1)/s,l.emToPx=L.lastEmToPx=(parseFloat(w.getPropertyValue(c,"paddingLeft"))||1)/s,t.myParent.removeChild(c)}return null===L.remToPx&&(L.remToPx=parseFloat(w.getPropertyValue(n.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(e.innerWidth)/100,L.vhToPx=parseFloat(e.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),a),l}();var $=/margin|padding|left|right|width|text|word|letter/i.test(E)||/X$/.test(E)||"x"===E?"x":"y";switch(Y){case"%":V*="x"===$?o.percentToPxWidth:o.percentToPxHeight;break;case"px":break;default:V*=o[Y+"ToPx"]}switch(B){case"%":V*=1/("x"===$?o.percentToPxWidth:o.percentToPxHeight);break;case"px":break;default:V*=1/o[B+"ToPx"]}}switch(j){case"+":R=V+R;break;case"-":R=V-R;break;case"*":R*=V;break;case"/":R=V/R}l[E]={rootPropertyValue:N,startValue:V,currentValue:V,endValue:R,unitType:B,easing:W},b.debug&&console.log("tweensContainer ("+E+"): "+JSON.stringify(l[E]),a)}else b.debug&&console.log("Skipping ["+z+"] due to a lack of browser support.")}l.element=a}l.element&&(w.Values.addClass(a,"velocity-animating"),F.push(l),""===s.queue&&(r(a).tweensContainer=l,r(a).opts=s),r(a).isAnimating=!0,S===C-1?(b.State.calls.push([F,f,s,null,I.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,u())):S++)}var o,a=this,s=h.extend({},b.defaults,y),l={};switch(r(a)===i&&b.init(a),parseFloat(s.delay)&&s.queue!==!1&&h.queue(a,s.queue,function(t){b.velocityQueueEntryFlag=!0,r(a).delayTimer={setTimeout:setTimeout(t,parseFloat(s.delay)),next:t}}),s.duration.toString().toLowerCase()){case"fast":s.duration=200;break;case"normal":s.duration=v;break;case"slow":s.duration=600;break;default:s.duration=parseFloat(s.duration)||1}b.mock!==!1&&(b.mock===!0?s.duration=s.delay=1:(s.duration*=parseFloat(b.mock)||1,s.delay*=parseFloat(b.mock)||1)),s.easing=c(s.easing,s.duration),s.begin&&!m.isFunction(s.begin)&&(s.begin=null),s.progress&&!m.isFunction(s.progress)&&(s.progress=null),s.complete&&!m.isFunction(s.complete)&&(s.complete=null),s.display!==i&&null!==s.display&&(s.display=s.display.toString().toLowerCase(),"auto"===s.display&&(s.display=b.CSS.Values.getDisplayType(a))),s.visibility!==i&&null!==s.visibility&&(s.visibility=s.visibility.toString().toLowerCase()),s.mobileHA=s.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,s.queue===!1?s.delay?setTimeout(t,s.delay):t():h.queue(a,s.queue,function(e,n){return n===!0?(I.promise&&I.resolver(f),!0):(b.velocityQueueEntryFlag=!0,void t(e))}),""!==s.queue&&"fx"!==s.queue||"inprogress"===h.queue(a)[0]||h.dequeue(a)}var s,l,p,f,g,y,x=arguments[0]&&(arguments[0].p||h.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||m.isString(arguments[0].properties));if(m.isWrapped(this)?(s=!1,p=0,f=this,l=this):(s=!0,p=1,f=x?arguments[0].elements||arguments[0].e:arguments[0]),f=a(f)){x?(g=arguments[0].properties||arguments[0].p,y=arguments[0].options||arguments[0].o):(g=arguments[p],y=arguments[p+1]);var C=f.length,S=0;if(!/^(stop|finish)$/i.test(g)&&!h.isPlainObject(y)){var T=p+1;y={};for(var M=T;M<arguments.length;M++)m.isArray(arguments[M])||!/^(fast|normal|slow)$/i.test(arguments[M])&&!/^\d/.test(arguments[M])?m.isString(arguments[M])||m.isArray(arguments[M])?y.easing=arguments[M]:m.isFunction(arguments[M])&&(y.complete=arguments[M]):y.duration=arguments[M]}var I={promise:null,resolver:null,rejecter:null};s&&b.Promise&&(I.promise=new b.Promise(function(t,e){I.resolver=t,I.rejecter=e}));var A;switch(g){case"scroll":A="scroll";break;case"reverse":A="reverse";break;case"finish":case"stop":h.each(f,function(t,e){r(e)&&r(e).delayTimer&&(clearTimeout(r(e).delayTimer.setTimeout),r(e).delayTimer.next&&r(e).delayTimer.next(),delete r(e).delayTimer)});var P=[];return h.each(b.State.calls,function(t,e){e&&h.each(e[1],function(n,o){var a=y===i?"":y;return a!==!0&&e[2].queue!==a&&(y!==i||e[2].queue!==!1)||void h.each(f,function(n,i){i===o&&((y===!0||m.isString(y))&&(h.each(h.queue(i,m.isString(y)?y:""),function(t,e){m.isFunction(e)&&e(null,!0)}),h.queue(i,m.isString(y)?y:"",[])),"stop"===g?(r(i)&&r(i).tweensContainer&&a!==!1&&h.each(r(i).tweensContainer,function(t,e){e.endValue=e.currentValue}),P.push(t)):"finish"===g&&(e[2].duration=1))})})}),"stop"===g&&(h.each(P,function(t,e){d(e,!0)}),I.promise&&I.resolver(f)),t();default:if(!h.isPlainObject(g)||m.isEmptyObject(g)){if(m.isString(g)&&b.Redirects[g]){var D=h.extend({},y),_=D.duration,E=D.delay||0;return D.backwards===!0&&(f=h.extend(!0,[],f).reverse()),h.each(f,function(t,e){parseFloat(D.stagger)?D.delay=E+parseFloat(D.stagger)*t:m.isFunction(D.stagger)&&(D.delay=E+D.stagger.call(e,t,C)),D.drag&&(D.duration=parseFloat(_)||(/^(callout|transition)/.test(g)?1e3:v),D.duration=Math.max(D.duration*(D.backwards?1-t/C:(t+1)/C),.75*D.duration,200)),b.Redirects[g].call(e,e,D||{},t,C,f,I.promise?I:i)}),t()}var O="Velocity: First argument ("+g+") was not a property map, a known action, or a registered redirect. Aborting.";return I.promise?I.rejecter(new Error(O)):console.log(O),t()}A="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},F=[];h.each(f,function(t,e){m.isNode(e)&&o.call(e)});var R,D=h.extend({},b.defaults,y);if(D.loop=parseInt(D.loop),R=2*D.loop-1,D.loop)for(var W=0;R>W;W++){var V={delay:D.delay,progress:D.progress};W===R-1&&(V.display=D.display,V.visibility=D.visibility,V.complete=D.complete),k(f,"reverse",V)}return t()}};b=h.extend(k,b),b.animate=k;var C=e.requestAnimationFrame||f;return b.State.isMobile||n.hidden===i||n.addEventListener("visibilitychange",function(){n.hidden?(C=function(t){return setTimeout(function(){t(!0)},16)},u()):C=e.requestAnimationFrame||f}),t.Velocity=b,t!==e&&(t.fn.velocity=k,t.fn.velocity.defaults=b.defaults),h.each(["Down","Up"],function(t,e){b.Redirects["slide"+e]=function(t,n,o,a,r,s){var l=h.extend({},n),c=l.begin,u=l.complete,d={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},p={};l.display===i&&(l.display="Down"===e?"inline"===b.CSS.Values.getDisplayType(t)?"inline-block":"block":"none"),l.begin=function(){c&&c.call(r,r);for(var n in d){p[n]=t.style[n];var i=b.CSS.getPropertyValue(t,n);d[n]="Down"===e?[i,0]:[0,i]}p.overflow=t.style.overflow,t.style.overflow="hidden"},l.complete=function(){for(var e in p)t.style[e]=p[e];u&&u.call(r,r),s&&s.resolver(r)},b(t,d,l)}}),h.each(["In","Out"],function(t,e){b.Redirects["fade"+e]=function(t,n,o,a,r,s){var l=h.extend({},n),c={opacity:"In"===e?1:0},u=l.complete;l.complete=o!==a-1?l.begin=null:function(){u&&u.call(r,r),s&&s.resolver(r)},l.display===i&&(l.display="In"===e?"auto":"none"),b(this,c,l)}}),b}(window.jQuery||window.Zepto||window,window,document)})),function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Chart=t()}}(function(){return function t(e,n,i){function o(r,s){if(!n[r]){if(!e[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(a)return a(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[r]={exports:{}};e[r][0].call(u.exports,function(t){var n=e[r][1][t];return o(n?n:t)},u,u.exports,t,e,n,i)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<i.length;r++)o(i[r]);return o}({1:[function(t,e,n){},{}],2:[function(t,e,n){function i(t){if(t){var e=[0,0,0],n=1,i=t.match(/^#([a-fA-F0-9]{3})$/);if(i){i=i[1];for(var o=0;o<e.length;o++)e[o]=parseInt(i[o]+i[o],16)}else if(i=t.match(/^#([a-fA-F0-9]{6})$/)){i=i[1];for(var o=0;o<e.length;o++)e[o]=parseInt(i.slice(2*o,2*o+2),16)}else if(i=t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)){for(var o=0;o<e.length;o++)e[o]=parseInt(i[o+1]);n=parseFloat(i[4])}else if(i=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)){for(var o=0;o<e.length;o++)e[o]=Math.round(2.55*parseFloat(i[o+1]));n=parseFloat(i[4])}else if(i=t.match(/(\w+)/)){if("transparent"==i[1])return[0,0,0,0];if(!(e=x[i[1]]))return}for(var o=0;o<e.length;o++)e[o]=y(e[o],0,255);return n=n||0==n?y(n,0,1):1,e[3]=n,e}}function o(t){if(t){var e=t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if(e){var n=parseFloat(e[4]);return[y(parseInt(e[1]),0,360),y(parseFloat(e[2]),0,100),y(parseFloat(e[3]),0,100),y(isNaN(n)?1:n,0,1)]}}}function a(t){if(t){var e=t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if(e){var n=parseFloat(e[4]);return[y(parseInt(e[1]),0,360),y(parseFloat(e[2]),0,100),y(parseFloat(e[3]),0,100),y(isNaN(n)?1:n,0,1)]}}}function r(t){var e=i(t);return e&&e.slice(0,3)}function s(t){var e=o(t);return e&&e.slice(0,3)}function l(t){var e=i(t);return e?e[3]:(e=o(t))?e[3]:(e=a(t))?e[3]:void 0}function c(t){return"#"+b(t[0])+b(t[1])+b(t[2])}function u(t,e){return e<1||t[3]&&t[3]<1?d(t,e):"rgb("+t[0]+", "+t[1]+", "+t[2]+")"}function d(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+e+")"}function h(t,e){return e<1||t[3]&&t[3]<1?p(t,e):"rgb("+Math.round(t[0]/255*100)+"%, "+Math.round(t[1]/255*100)+"%, "+Math.round(t[2]/255*100)+"%)"}function p(t,e){return"rgba("+Math.round(t[0]/255*100)+"%, "+Math.round(t[1]/255*100)+"%, "+Math.round(t[2]/255*100)+"%, "+(e||t[3]||1)+")"}function f(t,e){return e<1||t[3]&&t[3]<1?m(t,e):"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)"}function m(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+e+")"}function g(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+(void 0!==e&&1!==e?", "+e:"")+")"}function v(t){return w[t.slice(0,3)]}function y(t,e,n){return Math.min(Math.max(e,t),n)}function b(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}var x=t(6);e.exports={getRgba:i,getHsla:o,getRgb:r,getHsl:s,getHwb:a,getAlpha:l,hexString:c,rgbString:u,rgbaString:d,percentString:h,percentaString:p,hslString:f,hslaString:m,hwbString:g,keyword:v};var w={};for(var k in x)w[x[k]]=k},{6:6}],3:[function(t,e,n){var i=t(5),o=t(2),a=function(t){if(t instanceof a)return t;if(!(this instanceof a))return new a(t);this.valid=!1,this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1};var e;"string"==typeof t?(e=o.getRgba(t),e?this.setValues("rgb",e):(e=o.getHsla(t))?this.setValues("hsl",e):(e=o.getHwb(t))&&this.setValues("hwb",e)):"object"==typeof t&&(e=t,void 0!==e.r||void 0!==e.red?this.setValues("rgb",e):void 0!==e.l||void 0!==e.lightness?this.setValues("hsl",e):void 0!==e.v||void 0!==e.value?this.setValues("hsv",e):void 0!==e.w||void 0!==e.whiteness?this.setValues("hwb",e):void 0===e.c&&void 0===e.cyan||this.setValues("cmyk",e))};a.prototype={isValid:function(){return this.valid},rgb:function(){return this.setSpace("rgb",arguments)},hsl:function(){return this.setSpace("hsl",arguments)},hsv:function(){return this.setSpace("hsv",arguments)},hwb:function(){return this.setSpace("hwb",arguments)},cmyk:function(){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){var t=this.values;return 1!==t.alpha?t.hwb.concat([t.alpha]):t.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var t=this.values;return t.rgb.concat([t.alpha])},hslaArray:function(){var t=this.values;return t.hsl.concat([t.alpha])},alpha:function(t){return void 0===t?this.values.alpha:(this.setValues("alpha",t),this)},red:function(t){return this.setChannel("rgb",0,t)},green:function(t){return this.setChannel("rgb",1,t)},blue:function(t){return this.setChannel("rgb",2,t)},hue:function(t){return t&&(t%=360,t=t<0?360+t:t),this.setChannel("hsl",0,t)},saturation:function(t){return this.setChannel("hsl",1,t)},lightness:function(t){return this.setChannel("hsl",2,t)},saturationv:function(t){return this.setChannel("hsv",1,t)},whiteness:function(t){return this.setChannel("hwb",1,t)},blackness:function(t){return this.setChannel("hwb",2,t)},value:function(t){return this.setChannel("hsv",2,t)},cyan:function(t){return this.setChannel("cmyk",0,t)},magenta:function(t){return this.setChannel("cmyk",1,t)},yellow:function(t){return this.setChannel("cmyk",2,t)},black:function(t){return this.setChannel("cmyk",3,t)},hexString:function(){return o.hexString(this.values.rgb)},rgbString:function(){return o.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return o.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return o.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return o.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return o.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return o.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return o.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){var t=this.values.rgb;return t[0]<<16|t[1]<<8|t[2]},luminosity:function(){for(var t=this.values.rgb,e=[],n=0;n<t.length;n++){var i=t[n]/255;e[n]=i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t){var e=this.luminosity(),n=t.luminosity();return e>n?(e+.05)/(n+.05):(n+.05)/(e+.05)},level:function(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},dark:function(){var t=this.values.rgb;return(299*t[0]+587*t[1]+114*t[2])/1e3<128},light:function(){return!this.dark()},negate:function(){for(var t=[],e=0;e<3;e++)t[e]=255-this.values.rgb[e];return this.setValues("rgb",t),this},lighten:function(t){var e=this.values.hsl;return e[2]+=e[2]*t,this.setValues("hsl",e),this},darken:function(t){var e=this.values.hsl;return e[2]-=e[2]*t,this.setValues("hsl",e),this},saturate:function(t){var e=this.values.hsl;return e[1]+=e[1]*t,this.setValues("hsl",e),this},desaturate:function(t){var e=this.values.hsl;return e[1]-=e[1]*t,this.setValues("hsl",e),this},whiten:function(t){var e=this.values.hwb;return e[1]+=e[1]*t,this.setValues("hwb",e),this},blacken:function(t){var e=this.values.hwb;return e[2]+=e[2]*t,this.setValues("hwb",e),this},greyscale:function(){var t=this.values.rgb,e=.3*t[0]+.59*t[1]+.11*t[2];return this.setValues("rgb",[e,e,e]),this},clearer:function(t){var e=this.values.alpha;return this.setValues("alpha",e-e*t),this},opaquer:function(t){var e=this.values.alpha;return this.setValues("alpha",e+e*t),this},rotate:function(t){var e=this.values.hsl,n=(e[0]+t)%360;return e[0]=n<0?360+n:n,this.setValues("hsl",e),this},mix:function(t,e){var n=this,i=t,o=void 0===e?.5:e,a=2*o-1,r=n.alpha()-i.alpha(),s=((a*r==-1?a:(a+r)/(1+a*r))+1)/2,l=1-s;return this.rgb(s*n.red()+l*i.red(),s*n.green()+l*i.green(),s*n.blue()+l*i.blue()).alpha(n.alpha()*o+i.alpha()*(1-o))},toJSON:function(){return this.rgb()},clone:function(){var t,e,n=new a,i=this.values,o=n.values;for(var r in i)i.hasOwnProperty(r)&&(t=i[r],e={}.toString.call(t),"[object Array]"===e?o[r]=t.slice(0):"[object Number]"===e?o[r]=t:console.error("unexpected color value:",t));return n}},a.prototype.spaces={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},a.prototype.maxes={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},a.prototype.getValues=function(t){for(var e=this.values,n={},i=0;i<t.length;i++)n[t.charAt(i)]=e[t][i];return 1!==e.alpha&&(n.a=e.alpha),n},a.prototype.setValues=function(t,e){var n,o=this.values,a=this.spaces,r=this.maxes,s=1;if(this.valid=!0,"alpha"===t)s=e;else if(e.length)o[t]=e.slice(0,t.length),s=e[t.length];else if(void 0!==e[t.charAt(0)]){for(n=0;n<t.length;n++)o[t][n]=e[t.charAt(n)];s=e.a}else if(void 0!==e[a[t][0]]){var l=a[t];for(n=0;n<t.length;n++)o[t][n]=e[l[n]];s=e.alpha}if(o.alpha=Math.max(0,Math.min(1,void 0===s?o.alpha:s)),"alpha"===t)return!1;var c;for(n=0;n<t.length;n++)c=Math.max(0,Math.min(r[t][n],o[t][n])),o[t][n]=Math.round(c);for(var u in a)u!==t&&(o[u]=i[t][u](o[t]));return!0},a.prototype.setSpace=function(t,e){var n=e[0];return void 0===n?this.getValues(t):("number"==typeof n&&(n=Array.prototype.slice.call(e)),this.setValues(t,n),this)},a.prototype.setChannel=function(t,e,n){var i=this.values[t];return void 0===n?i[e]:n===i[e]?this:(i[e]=n,this.setValues(t,i),this)},"undefined"!=typeof window&&(window.Color=a),e.exports=a},{2:2,5:5}],4:[function(t,e,n){function i(t){var e,n,i,o=t[0]/255,a=t[1]/255,r=t[2]/255,s=Math.min(o,a,r),l=Math.max(o,a,r),c=l-s;return l==s?e=0:o==l?e=(a-r)/c:a==l?e=2+(r-o)/c:r==l&&(e=4+(o-a)/c),e=Math.min(60*e,360),e<0&&(e+=360),i=(s+l)/2,n=l==s?0:i<=.5?c/(l+s):c/(2-l-s),[e,100*n,100*i]}function o(t){var e,n,i,o=t[0],a=t[1],r=t[2],s=Math.min(o,a,r),l=Math.max(o,a,r),c=l-s;return n=0==l?0:c/l*1e3/10,l==s?e=0:o==l?e=(a-r)/c:a==l?e=2+(r-o)/c:r==l&&(e=4+(o-a)/c),e=Math.min(60*e,360),e<0&&(e+=360),i=l/255*1e3/10,[e,n,i]}function a(t){var e=t[0],n=t[1],o=t[2],a=i(t)[0],r=1/255*Math.min(e,Math.min(n,o)),o=1-1/255*Math.max(e,Math.max(n,o));return[a,100*r,100*o]}function s(t){var e,n,i,o,a=t[0]/255,r=t[1]/255,s=t[2]/255;return o=Math.min(1-a,1-r,1-s),e=(1-a-o)/(1-o)||0,n=(1-r-o)/(1-o)||0,i=(1-s-o)/(1-o)||0,[100*e,100*n,100*i,100*o]}function l(t){return G[JSON.stringify(t)]}function c(t){var e=t[0]/255,n=t[1]/255,i=t[2]/255;return e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92,i=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92,[100*(.4124*e+.3576*n+.1805*i),100*(.2126*e+.7152*n+.0722*i),100*(.0193*e+.1192*n+.9505*i)]}function u(t){var e,n,i,o=c(t),a=o[0],r=o[1],s=o[2];return a/=95.047,r/=100,s/=108.883,a=a>.008856?Math.pow(a,1/3):7.787*a+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,s=s>.008856?Math.pow(s,1/3):7.787*s+16/116,e=116*r-16,n=500*(a-r),i=200*(r-s),[e,n,i]}function d(t){return V(u(t))}function h(t){var e,n,i,o,a,r=t[0]/360,s=t[1]/100,l=t[2]/100;if(0==s)return a=255*l,[a,a,a];n=l<.5?l*(1+s):l+s-l*s,e=2*l-n,o=[0,0,0];for(var c=0;c<3;c++)i=r+1/3*-(c-1),i<0&&i++,i>1&&i--,a=6*i<1?e+6*(n-e)*i:2*i<1?n:3*i<2?e+(n-e)*(2/3-i)*6:e,o[c]=255*a;return o}function p(t){var e,n,i=t[0],o=t[1]/100,a=t[2]/100;return 0===a?[0,0,0]:(a*=2,o*=a<=1?a:2-a,n=(a+o)/2,e=2*o/(a+o),[i,100*e,100*n])}function f(t){return a(h(t))}function m(t){return s(h(t))}function v(t){return l(h(t))}function y(t){var e=t[0]/60,n=t[1]/100,i=t[2]/100,o=Math.floor(e)%6,a=e-Math.floor(e),r=255*i*(1-n),s=255*i*(1-n*a),l=255*i*(1-n*(1-a)),i=255*i;switch(o){case 0:return[i,l,r];case 1:return[s,i,r];case 2:return[r,i,l];case 3:return[r,s,i];case 4:return[l,r,i];case 5:return[i,r,s]}}function x(t){var e,n,i=t[0],o=t[1]/100,a=t[2]/100;return n=(2-o)*a,e=o*a,e/=n<=1?n:2-n,e=e||0,n/=2,[i,100*e,100*n]}function w(t){return a(y(t))}function k(t){return s(y(t))}function C(t){return l(y(t))}function S(t){var e,n,i,o,a=t[0]/360,s=t[1]/100,l=t[2]/100,c=s+l;switch(c>1&&(s/=c,l/=c),e=Math.floor(6*a),n=1-l,i=6*a-e,0!=(1&e)&&(i=1-i),o=s+i*(n-s),e){default:case 6:case 0:r=n,g=o,b=s;break;case 1:r=o,g=n,b=s;break;case 2:r=s,g=n,b=o;break;case 3:r=s,g=o,b=n;break;case 4:r=o,g=s,b=n;break;case 5:r=n,g=s,b=o}return[255*r,255*g,255*b]}function T(t){return i(S(t))}function M(t){return o(S(t))}function I(t){return s(S(t))}function A(t){return l(S(t))}function P(t){var e,n,i,o=t[0]/100,a=t[1]/100,r=t[2]/100,s=t[3]/100;return e=1-Math.min(1,o*(1-s)+s),n=1-Math.min(1,a*(1-s)+s),i=1-Math.min(1,r*(1-s)+s),[255*e,255*n,255*i]}function D(t){return i(P(t))}function _(t){return o(P(t))}function E(t){return a(P(t))}function O(t){return l(P(t))}function L(t){var e,n,i,o=t[0]/100,a=t[1]/100,r=t[2]/100;return e=3.2406*o+a*-1.5372+r*-.4986,n=o*-.9689+1.8758*a+.0415*r,i=.0557*o+a*-.204+1.057*r,e=e>.0031308?1.055*Math.pow(e,1/2.4)-.055:e*=12.92,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n*=12.92,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i*=12.92,e=Math.min(Math.max(0,e),1),n=Math.min(Math.max(0,n),1),i=Math.min(Math.max(0,i),1),[255*e,255*n,255*i]}function F(t){var e,n,i,o=t[0],a=t[1],r=t[2];return o/=95.047,a/=100,r/=108.883,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,a=a>.008856?Math.pow(a,1/3):7.787*a+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,e=116*a-16,n=500*(o-a),i=200*(a-r),[e,n,i]}function R(t){return V(F(t))}function W(t){var e,n,i,o,a=t[0],r=t[1],s=t[2];return a<=8?(n=100*a/903.3,o=n/100*7.787+16/116):(n=100*Math.pow((a+16)/116,3),o=Math.pow(n/100,1/3)),e=e/95.047<=.008856?e=95.047*(r/500+o-16/116)/7.787:95.047*Math.pow(r/500+o,3),i=i/108.883<=.008859?i=108.883*(o-s/200-16/116)/7.787:108.883*Math.pow(o-s/200,3),[e,n,i]}function V(t){var e,n,i,o=t[0],a=t[1],r=t[2];return e=Math.atan2(r,a),n=360*e/2/Math.PI,n<0&&(n+=360),i=Math.sqrt(a*a+r*r),[o,i,n]}function z(t){return L(W(t))}function N(t){var e,n,i,o=t[0],a=t[1],r=t[2];return i=r/360*2*Math.PI,e=a*Math.cos(i),n=a*Math.sin(i),[o,e,n]}function H(t){return W(N(t))}function B(t){return z(N(t))}function Y(t){return Z[t]}function j(t){return i(Y(t))}function $(t){return o(Y(t))}function X(t){return a(Y(t))}function q(t){return s(Y(t))}function U(t){return u(Y(t))}function Q(t){return c(Y(t))}e.exports={rgb2hsl:i,rgb2hsv:o,rgb2hwb:a,rgb2cmyk:s,rgb2keyword:l,rgb2xyz:c,rgb2lab:u,rgb2lch:d,hsl2rgb:h,hsl2hsv:p,hsl2hwb:f,hsl2cmyk:m,hsl2keyword:v,hsv2rgb:y,hsv2hsl:x,hsv2hwb:w,hsv2cmyk:k,hsv2keyword:C,hwb2rgb:S,hwb2hsl:T,hwb2hsv:M,hwb2cmyk:I,hwb2keyword:A,cmyk2rgb:P,cmyk2hsl:D,cmyk2hsv:_,cmyk2hwb:E,cmyk2keyword:O,keyword2rgb:Y,keyword2hsl:j,keyword2hsv:$,keyword2hwb:X,keyword2cmyk:q,keyword2lab:U,keyword2xyz:Q,xyz2rgb:L,xyz2lab:F,xyz2lch:R,lab2xyz:W,lab2rgb:z,lab2lch:V,lch2lab:N,lch2xyz:H,lch2rgb:B};var Z={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},G={};for(var K in Z)G[JSON.stringify(Z[K])]=K},{}],5:[function(t,e,n){var i=t(4),o=function(){return new c};for(var a in i){o[a+"Raw"]=function(t){return function(e){return"number"==typeof e&&(e=Array.prototype.slice.call(arguments)),i[t](e)}}(a);var r=/(\w+)2(\w+)/.exec(a),s=r[1],l=r[2];o[s]=o[s]||{},o[s][l]=o[a]=function(t){return function(e){"number"==typeof e&&(e=Array.prototype.slice.call(arguments));var n=i[t](e);if("string"==typeof n||void 0===n)return n;for(var o=0;o<n.length;o++)n[o]=Math.round(n[o]);return n}}(a)}var c=function(){this.convs={}};c.prototype.routeSpace=function(t,e){var n=e[0];return void 0===n?this.getValues(t):("number"==typeof n&&(n=Array.prototype.slice.call(e)),this.setValues(t,n))},c.prototype.setValues=function(t,e){return this.space=t,this.convs={},this.convs[t]=e,this},c.prototype.getValues=function(t){var e=this.convs[t];if(!e){var n=this.space,i=this.convs[n];e=o[n][t](i),this.convs[t]=e}return e},["rgb","hsl","hsv","cmyk","keyword"].forEach(function(t){c.prototype[t]=function(e){return this.routeSpace(t,arguments)}}),e.exports=o},{4:4}],6:[function(t,e,n){e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},{}],7:[function(t,e,n){var i=t(28)();t(26)(i),t(40)(i),t(22)(i),t(25)(i),t(30)(i),t(21)(i),t(23)(i),t(24)(i),t(29)(i),t(32)(i),t(33)(i),t(31)(i),t(27)(i),t(34)(i),t(35)(i),t(36)(i),t(37)(i),t(38)(i),t(46)(i),t(44)(i),t(45)(i),t(47)(i),t(48)(i),t(49)(i),t(15)(i),t(16)(i),t(17)(i),t(18)(i),t(19)(i),t(20)(i),t(8)(i),t(9)(i),t(10)(i),t(11)(i),t(12)(i),t(13)(i),t(14)(i);var o=[];o.push(t(41)(i),t(42)(i),t(43)(i)),i.plugins.register(o),e.exports=i,"undefined"!=typeof window&&(window.Chart=i)},{10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30,31:31,32:32,33:33,34:34,35:35,36:36,37:37,38:38,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,8:8,9:9}],8:[function(t,e,n){"use strict";e.exports=function(t){t.Bar=function(e,n){return n.type="bar",new t(e,n)}}},{}],9:[function(t,e,n){"use strict";e.exports=function(t){t.Bubble=function(e,n){return n.type="bubble",new t(e,n)}}},{}],10:[function(t,e,n){"use strict";e.exports=function(t){t.Doughnut=function(e,n){return n.type="doughnut",new t(e,n)}}},{}],11:[function(t,e,n){"use strict";e.exports=function(t){t.Line=function(e,n){return n.type="line",new t(e,n)}}},{}],12:[function(t,e,n){"use strict";e.exports=function(t){t.PolarArea=function(e,n){return n.type="polarArea",new t(e,n)}}},{}],13:[function(t,e,n){"use strict";e.exports=function(t){t.Radar=function(e,n){return n.type="radar",new t(e,n)}}},{}],14:[function(t,e,n){"use strict";e.exports=function(t){var e={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-1"}],yAxes:[{type:"linear",position:"left",id:"y-axis-1"}]},tooltips:{callbacks:{title:function(){return""},label:function(t){return"("+t.xLabel+", "+t.yLabel+")"}}}};t.defaults.scatter=e,t.controllers.scatter=t.controllers.line,t.Scatter=function(e,n){return n.type="scatter",new t(e,n)}}},{}],15:[function(t,e,n){"use strict";e.exports=function(t){
var e=t.helpers;t.defaults.bar={hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}},t.controllers.bar=t.DatasetController.extend({dataElementType:t.elements.Rectangle,initialize:function(){var e,n=this;t.DatasetController.prototype.initialize.apply(n,arguments),e=n.getMeta(),e.stack=n.getDataset().stack,e.bar=!0},update:function(t){var e,n,i=this,o=i.getMeta().data;for(i._ruler=i.getRuler(),e=0,n=o.length;e<n;++e)i.updateElement(o[e],e,t)},updateElement:function(t,n,i){var o=this,a=o.chart,r=o.getMeta(),s=o.getDataset(),l=t.custom||{},c=a.options.elements.rectangle;t._xScale=o.getScaleForId(r.xAxisID),t._yScale=o.getScaleForId(r.yAxisID),t._datasetIndex=o.index,t._index=n,t._model={datasetLabel:s.label,label:a.data.labels[n],borderSkipped:l.borderSkipped?l.borderSkipped:c.borderSkipped,backgroundColor:l.backgroundColor?l.backgroundColor:e.getValueAtIndexOrDefault(s.backgroundColor,n,c.backgroundColor),borderColor:l.borderColor?l.borderColor:e.getValueAtIndexOrDefault(s.borderColor,n,c.borderColor),borderWidth:l.borderWidth?l.borderWidth:e.getValueAtIndexOrDefault(s.borderWidth,n,c.borderWidth)},o.updateElementGeometry(t,n,i),t.pivot()},updateElementGeometry:function(t,e,n){var i=this,o=t._model,a=i.getValueScale(),r=a.getBasePixel(),s=a.isHorizontal(),l=i._ruler||i.getRuler(),c=i.calculateBarValuePixels(i.index,e),u=i.calculateBarIndexPixels(i.index,e,l);o.horizontal=s,o.base=n?r:c.base,o.x=s?n?r:c.head:u.center,o.y=s?u.center:n?r:c.head,o.height=s?u.size:void 0,o.width=s?void 0:u.size},getValueScaleId:function(){return this.getMeta().yAxisID},getIndexScaleId:function(){return this.getMeta().xAxisID},getValueScale:function(){return this.getScaleForId(this.getValueScaleId())},getIndexScale:function(){return this.getScaleForId(this.getIndexScaleId())},getStackCount:function(t){var e,n,i=this,o=i.chart,a=i.getIndexScale(),r=a.options.stacked,s=void 0===t?o.data.datasets.length:t+1,l=[];for(e=0;e<s;++e)n=o.getDatasetMeta(e),n.bar&&o.isDatasetVisible(e)&&(r===!1||r===!0&&l.indexOf(n.stack)===-1||void 0===r&&(void 0===n.stack||l.indexOf(n.stack)===-1))&&l.push(n.stack);return l.length},getStackIndex:function(t){return this.getStackCount(t)-1},getRuler:function(){var t=this,n=t.getIndexScale(),i=n.options,o=t.getStackCount(),a=n.isHorizontal()?n.width:n.height,r=a/n.ticks.length,s=r*i.categoryPercentage,l=s/o,c=l*i.barPercentage;return c=Math.min(e.getValueOrDefault(i.barThickness,c),e.getValueOrDefault(i.maxBarThickness,1/0)),{stackCount:o,tickSize:r,categorySize:s,categorySpacing:r-s,fullBarSize:l,barSize:c,barSpacing:l-c,scale:n}},calculateBarValuePixels:function(t,e){var n,i,o,a,r,s,l=this,c=l.chart,u=l.getMeta(),d=l.getValueScale(),h=c.data.datasets,p=Number(h[t].data[e]),f=d.options.stacked,m=u.stack,g=0;if(f||void 0===f&&void 0!==m)for(n=0;n<t;++n)i=c.getDatasetMeta(n),i.bar&&i.stack===m&&i.controller.getValueScaleId()===d.id&&c.isDatasetVisible(n)&&(o=Number(h[n].data[e]),(p<0&&o<0||p>=0&&o>0)&&(g+=o));return a=d.getPixelForValue(g),r=d.getPixelForValue(g+p),s=(r-a)/2,{size:s,base:a,head:r,center:r+s/2}},calculateBarIndexPixels:function(t,e,n){var i=this,o=n.scale,a=i.chart.isCombo,r=i.getStackIndex(t),s=o.getPixelForValue(null,e,t,a),l=n.barSize;return s-=a?n.tickSize/2:0,s+=n.fullBarSize*r,s+=n.categorySpacing/2,s+=n.barSpacing/2,{size:l,base:s,head:s+l,center:s+l/2}},draw:function(){var t,n=this,i=n.chart,o=n.getMeta().data,a=n.getDataset(),r=o.length,s=0;for(e.canvas.clipArea(i.ctx,i.chartArea);s<r;++s)null===(t=a.data[s])||void 0===t||isNaN(t)||o[s].draw();e.canvas.unclipArea(i.ctx)},setHoverStyle:function(t){var n=this.chart.data.datasets[t._datasetIndex],i=t._index,o=t.custom||{},a=t._model;a.backgroundColor=o.hoverBackgroundColor?o.hoverBackgroundColor:e.getValueAtIndexOrDefault(n.hoverBackgroundColor,i,e.getHoverColor(a.backgroundColor)),a.borderColor=o.hoverBorderColor?o.hoverBorderColor:e.getValueAtIndexOrDefault(n.hoverBorderColor,i,e.getHoverColor(a.borderColor)),a.borderWidth=o.hoverBorderWidth?o.hoverBorderWidth:e.getValueAtIndexOrDefault(n.hoverBorderWidth,i,a.borderWidth)},removeHoverStyle:function(t){var n=this.chart.data.datasets[t._datasetIndex],i=t._index,o=t.custom||{},a=t._model,r=this.chart.options.elements.rectangle;a.backgroundColor=o.backgroundColor?o.backgroundColor:e.getValueAtIndexOrDefault(n.backgroundColor,i,r.backgroundColor),a.borderColor=o.borderColor?o.borderColor:e.getValueAtIndexOrDefault(n.borderColor,i,r.borderColor),a.borderWidth=o.borderWidth?o.borderWidth:e.getValueAtIndexOrDefault(n.borderWidth,i,r.borderWidth)}}),t.defaults.horizontalBar={hover:{mode:"label"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{position:"left",type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}]},elements:{rectangle:{borderSkipped:"left"}},tooltips:{callbacks:{title:function(t,e){var n="";return t.length>0&&(t[0].yLabel?n=t[0].yLabel:e.labels.length>0&&t[0].index<e.labels.length&&(n=e.labels[t[0].index])),n},label:function(t,e){return(e.datasets[t.datasetIndex].label||"")+": "+t.xLabel}}}},t.controllers.horizontalBar=t.controllers.bar.extend({getValueScaleId:function(){return this.getMeta().xAxisID},getIndexScaleId:function(){return this.getMeta().yAxisID}})}},{}],16:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.bubble={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(){return""},label:function(t,e){var n=e.datasets[t.datasetIndex].label||"",i=e.datasets[t.datasetIndex].data[t.index];return n+": ("+t.xLabel+", "+t.yLabel+", "+i.r+")"}}}},t.controllers.bubble=t.DatasetController.extend({dataElementType:t.elements.Point,update:function(t){var n=this,i=n.getMeta(),o=i.data;e.each(o,function(e,i){n.updateElement(e,i,t)})},updateElement:function(n,i,o){var a=this,r=a.getMeta(),s=a.getScaleForId(r.xAxisID),l=a.getScaleForId(r.yAxisID),c=n.custom||{},u=a.getDataset(),d=u.data[i],h=a.chart.options.elements.point,p=a.index;e.extend(n,{_xScale:s,_yScale:l,_datasetIndex:p,_index:i,_model:{x:o?s.getPixelForDecimal(.5):s.getPixelForValue("object"==typeof d?d:NaN,i,p,a.chart.isCombo),y:o?l.getBasePixel():l.getPixelForValue(d,i,p),radius:o?0:c.radius?c.radius:a.getRadius(d),hitRadius:c.hitRadius?c.hitRadius:e.getValueAtIndexOrDefault(u.hitRadius,i,h.hitRadius)}}),t.DatasetController.prototype.removeHoverStyle.call(a,n,h);var f=n._model;f.skip=c.skip?c.skip:isNaN(f.x)||isNaN(f.y),n.pivot()},getRadius:function(t){return t.r||this.chart.options.elements.point.radius},setHoverStyle:function(n){var i=this;t.DatasetController.prototype.setHoverStyle.call(i,n);var o=i.chart.data.datasets[n._datasetIndex],a=n._index,r=n.custom||{};n._model.radius=r.hoverRadius?r.hoverRadius:e.getValueAtIndexOrDefault(o.hoverRadius,a,i.chart.options.elements.point.hoverRadius)+i.getRadius(o.data[a])},removeHoverStyle:function(e){var n=this;t.DatasetController.prototype.removeHoverStyle.call(n,e,n.chart.options.elements.point);var i=n.chart.data.datasets[e._datasetIndex].data[e._index],o=e.custom||{};e._model.radius=o.radius?o.radius:n.getRadius(i)}})}},{}],17:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n=t.defaults;n.doughnut={animation:{animateRotate:!0,animateScale:!1},aspectRatio:1,hover:{mode:"single"},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var n=t.data,i=n.datasets,o=n.labels;if(i.length)for(var a=0;a<i[0].data.length;++a)e.push('<li><span style="background-color:'+i[0].backgroundColor[a]+'"></span>'),o[a]&&e.push(o[a]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var n=t.data;return n.labels.length&&n.datasets.length?n.labels.map(function(i,o){var a=t.getDatasetMeta(0),r=n.datasets[0],s=a.data[o],l=s&&s.custom||{},c=e.getValueAtIndexOrDefault,u=t.options.elements.arc;return{text:i,fillStyle:l.backgroundColor?l.backgroundColor:c(r.backgroundColor,o,u.backgroundColor),strokeStyle:l.borderColor?l.borderColor:c(r.borderColor,o,u.borderColor),lineWidth:l.borderWidth?l.borderWidth:c(r.borderWidth,o,u.borderWidth),hidden:isNaN(r.data[o])||a.data[o].hidden,index:o}}):[]}},onClick:function(t,e){var n,i,o,a=e.index,r=this.chart;for(n=0,i=(r.data.datasets||[]).length;n<i;++n)o=r.getDatasetMeta(n),o.data[a]&&(o.data[a].hidden=!o.data[a].hidden);r.update()}},cutoutPercentage:50,rotation:Math.PI*-.5,circumference:2*Math.PI,tooltips:{callbacks:{title:function(){return""},label:function(t,n){var i=n.labels[t.index],o=": "+n.datasets[t.datasetIndex].data[t.index];return e.isArray(i)?(i=i.slice(),i[0]+=o):i+=o,i}}}},n.pie=e.clone(n.doughnut),e.extend(n.pie,{cutoutPercentage:0}),t.controllers.doughnut=t.controllers.pie=t.DatasetController.extend({dataElementType:t.elements.Arc,linkScales:e.noop,getRingIndex:function(t){for(var e=0,n=0;n<t;++n)this.chart.isDatasetVisible(n)&&++e;return e},update:function(t){var n=this,i=n.chart,o=i.chartArea,a=i.options,r=a.elements.arc,s=o.right-o.left-r.borderWidth,l=o.bottom-o.top-r.borderWidth,c=Math.min(s,l),u={x:0,y:0},d=n.getMeta(),h=a.cutoutPercentage,p=a.circumference;if(p<2*Math.PI){var f=a.rotation%(2*Math.PI);f+=2*Math.PI*(f>=Math.PI?-1:f<-Math.PI?1:0);var m=f+p,g={x:Math.cos(f),y:Math.sin(f)},v={x:Math.cos(m),y:Math.sin(m)},y=f<=0&&0<=m||f<=2*Math.PI&&2*Math.PI<=m,b=f<=.5*Math.PI&&.5*Math.PI<=m||f<=2.5*Math.PI&&2.5*Math.PI<=m,x=f<=-Math.PI&&-Math.PI<=m||f<=Math.PI&&Math.PI<=m,w=f<=.5*-Math.PI&&.5*-Math.PI<=m||f<=1.5*Math.PI&&1.5*Math.PI<=m,k=h/100,C={x:x?-1:Math.min(g.x*(g.x<0?1:k),v.x*(v.x<0?1:k)),y:w?-1:Math.min(g.y*(g.y<0?1:k),v.y*(v.y<0?1:k))},S={x:y?1:Math.max(g.x*(g.x>0?1:k),v.x*(v.x>0?1:k)),y:b?1:Math.max(g.y*(g.y>0?1:k),v.y*(v.y>0?1:k))},T={width:.5*(S.x-C.x),height:.5*(S.y-C.y)};c=Math.min(s/T.width,l/T.height),u={x:(S.x+C.x)*-.5,y:(S.y+C.y)*-.5}}i.borderWidth=n.getMaxBorderWidth(d.data),i.outerRadius=Math.max((c-i.borderWidth)/2,0),i.innerRadius=Math.max(h?i.outerRadius/100*h:0,0),i.radiusLength=(i.outerRadius-i.innerRadius)/i.getVisibleDatasetCount(),i.offsetX=u.x*i.outerRadius,i.offsetY=u.y*i.outerRadius,d.total=n.calculateTotal(),n.outerRadius=i.outerRadius-i.radiusLength*n.getRingIndex(n.index),n.innerRadius=Math.max(n.outerRadius-i.radiusLength,0),e.each(d.data,function(e,i){n.updateElement(e,i,t)})},updateElement:function(t,n,i){var o=this,a=o.chart,r=a.chartArea,s=a.options,l=s.animation,c=(r.left+r.right)/2,u=(r.top+r.bottom)/2,d=s.rotation,h=s.rotation,p=o.getDataset(),f=i&&l.animateRotate?0:t.hidden?0:o.calculateCircumference(p.data[n])*(s.circumference/(2*Math.PI)),m=i&&l.animateScale?0:o.innerRadius,g=i&&l.animateScale?0:o.outerRadius,v=e.getValueAtIndexOrDefault;e.extend(t,{_datasetIndex:o.index,_index:n,_model:{x:c+a.offsetX,y:u+a.offsetY,startAngle:d,endAngle:h,circumference:f,outerRadius:g,innerRadius:m,label:v(p.label,n,a.data.labels[n])}});var y=t._model;this.removeHoverStyle(t),i&&l.animateRotate||(y.startAngle=0===n?s.rotation:o.getMeta().data[n-1]._model.endAngle,y.endAngle=y.startAngle+y.circumference),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},calculateTotal:function(){var t,n=this.getDataset(),i=this.getMeta(),o=0;return e.each(i.data,function(e,i){t=n.data[i],isNaN(t)||e.hidden||(o+=Math.abs(t))}),o},calculateCircumference:function(t){var e=this.getMeta().total;return e>0&&!isNaN(t)?2*Math.PI*(t/e):0},getMaxBorderWidth:function(t){for(var e,n,i=0,o=this.index,a=t.length,r=0;r<a;r++)e=t[r]._model?t[r]._model.borderWidth:0,n=t[r]._chart?t[r]._chart.config.data.datasets[o].hoverBorderWidth:0,i=e>i?e:i,i=n>i?n:i;return i}})}},{}],18:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){return n.getValueOrDefault(t.showLine,e.showLines)}var n=t.helpers;t.defaults.line={showLines:!0,spanGaps:!1,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}},t.controllers.line=t.DatasetController.extend({datasetElementType:t.elements.Line,dataElementType:t.elements.Point,update:function(t){var i,o,a,r=this,s=r.getMeta(),l=s.dataset,c=s.data||[],u=r.chart.options,d=u.elements.line,h=r.getScaleForId(s.yAxisID),p=r.getDataset(),f=e(p,u);for(f&&(a=l.custom||{},void 0!==p.tension&&void 0===p.lineTension&&(p.lineTension=p.tension),l._scale=h,l._datasetIndex=r.index,l._children=c,l._model={spanGaps:p.spanGaps?p.spanGaps:u.spanGaps,tension:a.tension?a.tension:n.getValueOrDefault(p.lineTension,d.tension),backgroundColor:a.backgroundColor?a.backgroundColor:p.backgroundColor||d.backgroundColor,borderWidth:a.borderWidth?a.borderWidth:p.borderWidth||d.borderWidth,borderColor:a.borderColor?a.borderColor:p.borderColor||d.borderColor,borderCapStyle:a.borderCapStyle?a.borderCapStyle:p.borderCapStyle||d.borderCapStyle,borderDash:a.borderDash?a.borderDash:p.borderDash||d.borderDash,borderDashOffset:a.borderDashOffset?a.borderDashOffset:p.borderDashOffset||d.borderDashOffset,borderJoinStyle:a.borderJoinStyle?a.borderJoinStyle:p.borderJoinStyle||d.borderJoinStyle,fill:a.fill?a.fill:void 0!==p.fill?p.fill:d.fill,steppedLine:a.steppedLine?a.steppedLine:n.getValueOrDefault(p.steppedLine,d.stepped),cubicInterpolationMode:a.cubicInterpolationMode?a.cubicInterpolationMode:n.getValueOrDefault(p.cubicInterpolationMode,d.cubicInterpolationMode)},l.pivot()),i=0,o=c.length;i<o;++i)r.updateElement(c[i],i,t);for(f&&0!==l._model.tension&&r.updateBezierControlPoints(),i=0,o=c.length;i<o;++i)c[i].pivot()},getPointBackgroundColor:function(t,e){var i=this.chart.options.elements.point.backgroundColor,o=this.getDataset(),a=t.custom||{};return a.backgroundColor?i=a.backgroundColor:o.pointBackgroundColor?i=n.getValueAtIndexOrDefault(o.pointBackgroundColor,e,i):o.backgroundColor&&(i=o.backgroundColor),i},getPointBorderColor:function(t,e){var i=this.chart.options.elements.point.borderColor,o=this.getDataset(),a=t.custom||{};return a.borderColor?i=a.borderColor:o.pointBorderColor?i=n.getValueAtIndexOrDefault(o.pointBorderColor,e,i):o.borderColor&&(i=o.borderColor),i},getPointBorderWidth:function(t,e){var i=this.chart.options.elements.point.borderWidth,o=this.getDataset(),a=t.custom||{};return isNaN(a.borderWidth)?isNaN(o.pointBorderWidth)?isNaN(o.borderWidth)||(i=o.borderWidth):i=n.getValueAtIndexOrDefault(o.pointBorderWidth,e,i):i=a.borderWidth,i},updateElement:function(t,e,i){var o,a,r=this,s=r.getMeta(),l=t.custom||{},c=r.getDataset(),u=r.index,d=c.data[e],h=r.getScaleForId(s.yAxisID),p=r.getScaleForId(s.xAxisID),f=r.chart.options.elements.point,m=r.chart.data.labels||[],g=1===m.length||1===c.data.length||r.chart.isCombo;void 0!==c.radius&&void 0===c.pointRadius&&(c.pointRadius=c.radius),void 0!==c.hitRadius&&void 0===c.pointHitRadius&&(c.pointHitRadius=c.hitRadius),o=p.getPixelForValue("object"==typeof d?d:NaN,e,u,g),a=i?h.getBasePixel():r.calculatePointY(d,e,u),t._xScale=p,t._yScale=h,t._datasetIndex=u,t._index=e,t._model={x:o,y:a,skip:l.skip||isNaN(o)||isNaN(a),radius:l.radius||n.getValueAtIndexOrDefault(c.pointRadius,e,f.radius),pointStyle:l.pointStyle||n.getValueAtIndexOrDefault(c.pointStyle,e,f.pointStyle),backgroundColor:r.getPointBackgroundColor(t,e),borderColor:r.getPointBorderColor(t,e),borderWidth:r.getPointBorderWidth(t,e),tension:s.dataset._model?s.dataset._model.tension:0,steppedLine:!!s.dataset._model&&s.dataset._model.steppedLine,hitRadius:l.hitRadius||n.getValueAtIndexOrDefault(c.pointHitRadius,e,f.hitRadius)}},calculatePointY:function(t,e,n){var i,o,a,r=this,s=r.chart,l=r.getMeta(),c=r.getScaleForId(l.yAxisID),u=0,d=0;if(c.options.stacked){for(i=0;i<n;i++)if(o=s.data.datasets[i],a=s.getDatasetMeta(i),"line"===a.type&&a.yAxisID===c.id&&s.isDatasetVisible(i)){var h=Number(c.getRightValue(o.data[e]));h<0?d+=h||0:u+=h||0}var p=Number(c.getRightValue(t));return p<0?c.getPixelForValue(d+p):c.getPixelForValue(u+p)}return c.getPixelForValue(t)},updateBezierControlPoints:function(){function t(t,e,n){return Math.max(Math.min(t,n),e)}var e,i,o,a,r,s=this,l=s.getMeta(),c=s.chart.chartArea,u=l.data||[];if(l.dataset._model.spanGaps&&(u=u.filter(function(t){return!t._model.skip})),"monotone"===l.dataset._model.cubicInterpolationMode)n.splineCurveMonotone(u);else for(e=0,i=u.length;e<i;++e)o=u[e],a=o._model,r=n.splineCurve(n.previousItem(u,e)._model,a,n.nextItem(u,e)._model,l.dataset._model.tension),a.controlPointPreviousX=r.previous.x,a.controlPointPreviousY=r.previous.y,a.controlPointNextX=r.next.x,a.controlPointNextY=r.next.y;if(s.chart.options.elements.line.capBezierPoints)for(e=0,i=u.length;e<i;++e)a=u[e]._model,a.controlPointPreviousX=t(a.controlPointPreviousX,c.left,c.right),a.controlPointPreviousY=t(a.controlPointPreviousY,c.top,c.bottom),a.controlPointNextX=t(a.controlPointNextX,c.left,c.right),a.controlPointNextY=t(a.controlPointNextY,c.top,c.bottom)},draw:function(){var n=this,i=n.chart,o=n.getMeta(),a=o.data||[],r=i.chartArea,s=a.length,l=0;for(t.canvasHelpers.clipArea(i.ctx,r),e(n.getDataset(),i.options)&&o.dataset.draw(),t.canvasHelpers.unclipArea(i.ctx);l<s;++l)a[l].draw(r)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],i=t._index,o=t.custom||{},a=t._model;a.radius=o.hoverRadius||n.getValueAtIndexOrDefault(e.pointHoverRadius,i,this.chart.options.elements.point.hoverRadius),a.backgroundColor=o.hoverBackgroundColor||n.getValueAtIndexOrDefault(e.pointHoverBackgroundColor,i,n.getHoverColor(a.backgroundColor)),a.borderColor=o.hoverBorderColor||n.getValueAtIndexOrDefault(e.pointHoverBorderColor,i,n.getHoverColor(a.borderColor)),a.borderWidth=o.hoverBorderWidth||n.getValueAtIndexOrDefault(e.pointHoverBorderWidth,i,a.borderWidth)},removeHoverStyle:function(t){var e=this,i=e.chart.data.datasets[t._datasetIndex],o=t._index,a=t.custom||{},r=t._model;void 0!==i.radius&&void 0===i.pointRadius&&(i.pointRadius=i.radius),r.radius=a.radius||n.getValueAtIndexOrDefault(i.pointRadius,o,e.chart.options.elements.point.radius),r.backgroundColor=e.getPointBackgroundColor(t,o),r.borderColor=e.getPointBorderColor(t,o),r.borderWidth=e.getPointBorderWidth(t,o)}})}},{}],19:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.polarArea={scale:{type:"radialLinear",angleLines:{display:!1},gridLines:{circular:!0},pointLabels:{display:!1},ticks:{beginAtZero:!0}},animation:{animateRotate:!0,animateScale:!0},startAngle:-.5*Math.PI,aspectRatio:1,legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var n=t.data,i=n.datasets,o=n.labels;if(i.length)for(var a=0;a<i[0].data.length;++a)e.push('<li><span style="background-color:'+i[0].backgroundColor[a]+'"></span>'),o[a]&&e.push(o[a]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var n=t.data;return n.labels.length&&n.datasets.length?n.labels.map(function(i,o){var a=t.getDatasetMeta(0),r=n.datasets[0],s=a.data[o],l=s.custom||{},c=e.getValueAtIndexOrDefault,u=t.options.elements.arc;return{text:i,fillStyle:l.backgroundColor?l.backgroundColor:c(r.backgroundColor,o,u.backgroundColor),strokeStyle:l.borderColor?l.borderColor:c(r.borderColor,o,u.borderColor),lineWidth:l.borderWidth?l.borderWidth:c(r.borderWidth,o,u.borderWidth),hidden:isNaN(r.data[o])||a.data[o].hidden,index:o}}):[]}},onClick:function(t,e){var n,i,o,a=e.index,r=this.chart;for(n=0,i=(r.data.datasets||[]).length;n<i;++n)o=r.getDatasetMeta(n),o.data[a].hidden=!o.data[a].hidden;r.update()}},tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+t.yLabel}}}},t.controllers.polarArea=t.DatasetController.extend({dataElementType:t.elements.Arc,linkScales:e.noop,update:function(t){var n=this,i=n.chart,o=i.chartArea,a=n.getMeta(),r=i.options,s=r.elements.arc,l=Math.min(o.right-o.left,o.bottom-o.top);i.outerRadius=Math.max((l-s.borderWidth/2)/2,0),i.innerRadius=Math.max(r.cutoutPercentage?i.outerRadius/100*r.cutoutPercentage:1,0),i.radiusLength=(i.outerRadius-i.innerRadius)/i.getVisibleDatasetCount(),n.outerRadius=i.outerRadius-i.radiusLength*n.index,n.innerRadius=n.outerRadius-i.radiusLength,a.count=n.countVisibleElements(),e.each(a.data,function(e,i){n.updateElement(e,i,t)})},updateElement:function(t,n,i){for(var o=this,a=o.chart,r=o.getDataset(),s=a.options,l=s.animation,c=a.scale,u=e.getValueAtIndexOrDefault,d=a.data.labels,h=o.calculateCircumference(r.data[n]),p=c.xCenter,f=c.yCenter,m=0,g=o.getMeta(),v=0;v<n;++v)isNaN(r.data[v])||g.data[v].hidden||++m;var y=s.startAngle,b=t.hidden?0:c.getDistanceFromCenterForValue(r.data[n]),x=y+h*m,w=x+(t.hidden?0:h),k=l.animateScale?0:c.getDistanceFromCenterForValue(r.data[n]);e.extend(t,{_datasetIndex:o.index,_index:n,_scale:c,_model:{x:p,y:f,innerRadius:0,outerRadius:i?k:b,startAngle:i&&l.animateRotate?y:x,endAngle:i&&l.animateRotate?y:w,label:u(d,n,d[n])}}),o.removeHoverStyle(t),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},countVisibleElements:function(){var t=this.getDataset(),n=this.getMeta(),i=0;return e.each(n.data,function(e,n){isNaN(t.data[n])||e.hidden||i++}),i},calculateCircumference:function(t){var e=this.getMeta().count;return e>0&&!isNaN(t)?2*Math.PI/e:0}})}},{}],20:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.radar={aspectRatio:1,scale:{type:"radialLinear"},elements:{line:{tension:0}}},t.controllers.radar=t.DatasetController.extend({datasetElementType:t.elements.Line,dataElementType:t.elements.Point,linkScales:e.noop,update:function(t){var n=this,i=n.getMeta(),o=i.dataset,a=i.data,r=o.custom||{},s=n.getDataset(),l=n.chart.options.elements.line,c=n.chart.scale;void 0!==s.tension&&void 0===s.lineTension&&(s.lineTension=s.tension),e.extend(i.dataset,{_datasetIndex:n.index,_scale:c,_children:a,_loop:!0,_model:{tension:r.tension?r.tension:e.getValueOrDefault(s.lineTension,l.tension),backgroundColor:r.backgroundColor?r.backgroundColor:s.backgroundColor||l.backgroundColor,borderWidth:r.borderWidth?r.borderWidth:s.borderWidth||l.borderWidth,borderColor:r.borderColor?r.borderColor:s.borderColor||l.borderColor,fill:r.fill?r.fill:void 0!==s.fill?s.fill:l.fill,borderCapStyle:r.borderCapStyle?r.borderCapStyle:s.borderCapStyle||l.borderCapStyle,borderDash:r.borderDash?r.borderDash:s.borderDash||l.borderDash,borderDashOffset:r.borderDashOffset?r.borderDashOffset:s.borderDashOffset||l.borderDashOffset,borderJoinStyle:r.borderJoinStyle?r.borderJoinStyle:s.borderJoinStyle||l.borderJoinStyle}}),i.dataset.pivot(),e.each(a,function(e,i){n.updateElement(e,i,t)},n),n.updateBezierControlPoints()},updateElement:function(t,n,i){var o=this,a=t.custom||{},r=o.getDataset(),s=o.chart.scale,l=o.chart.options.elements.point,c=s.getPointPositionForValue(n,r.data[n]);void 0!==r.radius&&void 0===r.pointRadius&&(r.pointRadius=r.radius),void 0!==r.hitRadius&&void 0===r.pointHitRadius&&(r.pointHitRadius=r.hitRadius),e.extend(t,{_datasetIndex:o.index,_index:n,_scale:s,_model:{x:i?s.xCenter:c.x,y:i?s.yCenter:c.y,tension:a.tension?a.tension:e.getValueOrDefault(r.lineTension,o.chart.options.elements.line.tension),radius:a.radius?a.radius:e.getValueAtIndexOrDefault(r.pointRadius,n,l.radius),backgroundColor:a.backgroundColor?a.backgroundColor:e.getValueAtIndexOrDefault(r.pointBackgroundColor,n,l.backgroundColor),borderColor:a.borderColor?a.borderColor:e.getValueAtIndexOrDefault(r.pointBorderColor,n,l.borderColor),borderWidth:a.borderWidth?a.borderWidth:e.getValueAtIndexOrDefault(r.pointBorderWidth,n,l.borderWidth),pointStyle:a.pointStyle?a.pointStyle:e.getValueAtIndexOrDefault(r.pointStyle,n,l.pointStyle),hitRadius:a.hitRadius?a.hitRadius:e.getValueAtIndexOrDefault(r.pointHitRadius,n,l.hitRadius)}}),t._model.skip=a.skip?a.skip:isNaN(t._model.x)||isNaN(t._model.y)},updateBezierControlPoints:function(){var t=this.chart.chartArea,n=this.getMeta();e.each(n.data,function(i,o){var a=i._model,r=e.splineCurve(e.previousItem(n.data,o,!0)._model,a,e.nextItem(n.data,o,!0)._model,a.tension);a.controlPointPreviousX=Math.max(Math.min(r.previous.x,t.right),t.left),a.controlPointPreviousY=Math.max(Math.min(r.previous.y,t.bottom),t.top),a.controlPointNextX=Math.max(Math.min(r.next.x,t.right),t.left),a.controlPointNextY=Math.max(Math.min(r.next.y,t.bottom),t.top),i.pivot()})},setHoverStyle:function(t){var n=this.chart.data.datasets[t._datasetIndex],i=t.custom||{},o=t._index,a=t._model;a.radius=i.hoverRadius?i.hoverRadius:e.getValueAtIndexOrDefault(n.pointHoverRadius,o,this.chart.options.elements.point.hoverRadius),a.backgroundColor=i.hoverBackgroundColor?i.hoverBackgroundColor:e.getValueAtIndexOrDefault(n.pointHoverBackgroundColor,o,e.getHoverColor(a.backgroundColor)),a.borderColor=i.hoverBorderColor?i.hoverBorderColor:e.getValueAtIndexOrDefault(n.pointHoverBorderColor,o,e.getHoverColor(a.borderColor)),a.borderWidth=i.hoverBorderWidth?i.hoverBorderWidth:e.getValueAtIndexOrDefault(n.pointHoverBorderWidth,o,a.borderWidth)},removeHoverStyle:function(t){var n=this.chart.data.datasets[t._datasetIndex],i=t.custom||{},o=t._index,a=t._model,r=this.chart.options.elements.point;a.radius=i.radius?i.radius:e.getValueAtIndexOrDefault(n.pointRadius,o,r.radius),a.backgroundColor=i.backgroundColor?i.backgroundColor:e.getValueAtIndexOrDefault(n.pointBackgroundColor,o,r.backgroundColor),a.borderColor=i.borderColor?i.borderColor:e.getValueAtIndexOrDefault(n.pointBorderColor,o,r.borderColor),a.borderWidth=i.borderWidth?i.borderWidth:e.getValueAtIndexOrDefault(n.pointBorderWidth,o,r.borderWidth)}})}},{}],21:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.animation={duration:1e3,easing:"easeOutQuart",onProgress:e.noop,onComplete:e.noop},t.Animation=t.Element.extend({chart:null,currentStep:0,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),t.animationService={frameDuration:17,animations:[],dropFrames:0,request:null,addAnimation:function(t,e,n,i){var o,a,r=this.animations;for(e.chart=t,i||(t.animating=!0),o=0,a=r.length;o<a;++o)if(r[o].chart===t)return void(r[o]=e);r.push(e),1===r.length&&this.requestAnimationFrame()},cancelAnimation:function(t){var n=e.findIndex(this.animations,function(e){return e.chart===t});n!==-1&&(this.animations.splice(n,1),t.animating=!1)},requestAnimationFrame:function(){var t=this;null===t.request&&(t.request=e.requestAnimFrame.call(window,function(){t.request=null,t.startDigest()}))},startDigest:function(){var t=this,e=Date.now(),n=0;t.dropFrames>1&&(n=Math.floor(t.dropFrames),t.dropFrames=t.dropFrames%1),t.advance(1+n);var i=Date.now();t.dropFrames+=(i-e)/t.frameDuration,t.animations.length>0&&t.requestAnimationFrame()},advance:function(t){for(var n,i,o=this.animations,a=0;a<o.length;)n=o[a],i=n.chart,n.currentStep=(n.currentStep||0)+t,n.currentStep=Math.min(n.currentStep,n.numSteps),e.callback(n.render,[i,n],i),e.callback(n.onAnimationProgress,[n],i),n.currentStep>=n.numSteps?(e.callback(n.onAnimationComplete,[n],i),i.animating=!1,o.splice(a,1)):++a}},Object.defineProperty(t.Animation.prototype,"animationObject",{get:function(){return this}}),Object.defineProperty(t.Animation.prototype,"chartInstance",{get:function(){return this.chart},set:function(t){this.chart=t}})}},{}],22:[function(t,e,n){"use strict";e.exports=function(t){var e=t.canvasHelpers={};e.drawPoint=function(e,n,i,o,a){var r,s,l,c,u,d;if("object"==typeof n&&("[object HTMLImageElement]"===(r=n.toString())||"[object HTMLCanvasElement]"===r))return void e.drawImage(n,o-n.width/2,a-n.height/2,n.width,n.height);if(!(isNaN(i)||i<=0)){switch(n){default:e.beginPath(),e.arc(o,a,i,0,2*Math.PI),e.closePath(),e.fill();break;case"triangle":e.beginPath(),s=3*i/Math.sqrt(3),u=s*Math.sqrt(3)/2,e.moveTo(o-s/2,a+u/3),e.lineTo(o+s/2,a+u/3),e.lineTo(o,a-2*u/3),e.closePath(),e.fill();break;case"rect":d=1/Math.SQRT2*i,e.beginPath(),e.fillRect(o-d,a-d,2*d,2*d),e.strokeRect(o-d,a-d,2*d,2*d);break;case"rectRounded":var h=i/Math.SQRT2,p=o-h,f=a-h,m=Math.SQRT2*i;t.helpers.drawRoundedRectangle(e,p,f,m,m,i/2),e.fill();break;case"rectRot":d=1/Math.SQRT2*i,e.beginPath(),e.moveTo(o-d,a),e.lineTo(o,a+d),e.lineTo(o+d,a),e.lineTo(o,a-d),e.closePath(),e.fill();break;case"cross":e.beginPath(),e.moveTo(o,a+i),e.lineTo(o,a-i),e.moveTo(o-i,a),e.lineTo(o+i,a),e.closePath();break;case"crossRot":e.beginPath(),l=Math.cos(Math.PI/4)*i,c=Math.sin(Math.PI/4)*i,e.moveTo(o-l,a-c),e.lineTo(o+l,a+c),e.moveTo(o-l,a+c),e.lineTo(o+l,a-c),e.closePath();break;case"star":e.beginPath(),e.moveTo(o,a+i),e.lineTo(o,a-i),e.moveTo(o-i,a),e.lineTo(o+i,a),l=Math.cos(Math.PI/4)*i,c=Math.sin(Math.PI/4)*i,e.moveTo(o-l,a-c),e.lineTo(o+l,a+c),e.moveTo(o-l,a+c),e.lineTo(o+l,a-c),e.closePath();break;case"line":e.beginPath(),e.moveTo(o-i,a),e.lineTo(o+i,a),e.closePath();break;case"dash":e.beginPath(),e.moveTo(o,a),e.lineTo(o+i,a),e.closePath()}e.stroke()}},e.clipArea=function(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()},e.unclipArea=function(t){t.restore()},e.lineTo=function(t,e,n,i){return n.steppedLine?("after"===n.steppedLine?t.lineTo(e.x,n.y):t.lineTo(n.x,e.y),void t.lineTo(n.x,n.y)):n.tension?void t.bezierCurveTo(i?e.controlPointPreviousX:e.controlPointNextX,i?e.controlPointPreviousY:e.controlPointNextY,i?n.controlPointNextX:n.controlPointPreviousX,i?n.controlPointNextY:n.controlPointPreviousY,n.x,n.y):void t.lineTo(n.x,n.y)},t.helpers.canvas=e}},{}],23:[function(t,e,n){"use strict";e.exports=function(t){function e(e){e=e||{};var n=e.data=e.data||{};return n.datasets=n.datasets||[],n.labels=n.labels||[],e.options=o.configMerge(t.defaults.global,t.defaults[e.type],e.options||{}),e}function n(t){var e=t.options;e.scale?t.scale.options=e.scale:e.scales&&e.scales.xAxes.concat(e.scales.yAxes).forEach(function(e){t.scales[e.id].options=e}),t.tooltip._options=e.tooltips}function i(t){return"top"===t||"bottom"===t}var o=t.helpers,a=t.plugins,r=t.platform;t.types={},t.instances={},t.controllers={},o.extend(t.prototype,{construct:function(n,i){var a=this;i=e(i);var s=r.acquireContext(n,i),l=s&&s.canvas,c=l&&l.height,u=l&&l.width;if(a.id=o.uid(),a.ctx=s,a.canvas=l,a.config=i,a.width=u,a.height=c,a.aspectRatio=c?u/c:null,a.options=i.options,a._bufferedRender=!1,a.chart=a,a.controller=a,t.instances[a.id]=a,Object.defineProperty(a,"data",{get:function(){return a.config.data},set:function(t){a.config.data=t}}),!s||!l)return void console.error("Failed to create chart: can't acquire context from the given item");a.initialize(),a.update()},initialize:function(){var t=this;return a.notify(t,"beforeInit"),o.retinaScale(t),t.bindEvents(),t.options.responsive&&t.resize(!0),t.ensureScalesHaveIDs(),t.buildScales(),t.initToolTip(),a.notify(t,"afterInit"),t},clear:function(){return o.clear(this),this},stop:function(){return t.animationService.cancelAnimation(this),this},resize:function(t){var e=this,n=e.options,i=e.canvas,r=n.maintainAspectRatio&&e.aspectRatio||null,s=Math.floor(o.getMaximumWidth(i)),l=Math.floor(r?s/r:o.getMaximumHeight(i));if((e.width!==s||e.height!==l)&&(i.width=e.width=s,i.height=e.height=l,i.style.width=s+"px",i.style.height=l+"px",o.retinaScale(e),!t)){var c={width:s,height:l};a.notify(e,"resize",[c]),e.options.onResize&&e.options.onResize(e,c),e.stop(),e.update(e.options.responsiveAnimationDuration)}},ensureScalesHaveIDs:function(){var t=this.options,e=t.scales||{},n=t.scale;o.each(e.xAxes,function(t,e){t.id=t.id||"x-axis-"+e}),o.each(e.yAxes,function(t,e){t.id=t.id||"y-axis-"+e}),n&&(n.id=n.id||"scale")},buildScales:function(){var e=this,n=e.options,a=e.scales={},r=[];n.scales&&(r=r.concat((n.scales.xAxes||[]).map(function(t){return{options:t,dtype:"category",dposition:"bottom"}}),(n.scales.yAxes||[]).map(function(t){return{options:t,dtype:"linear",dposition:"left"}}))),n.scale&&r.push({options:n.scale,dtype:"radialLinear",isDefault:!0,dposition:"chartArea"}),o.each(r,function(n){
var r=n.options,s=o.getValueOrDefault(r.type,n.dtype),l=t.scaleService.getScaleConstructor(s);if(l){i(r.position)!==i(n.dposition)&&(r.position=n.dposition);var c=new l({id:r.id,options:r,ctx:e.ctx,chart:e});a[c.id]=c,n.isDefault&&(e.scale=c)}}),t.scaleService.addScalesToLayout(this)},buildOrUpdateControllers:function(){var e=this,n=[],i=[];if(o.each(e.data.datasets,function(o,a){var r=e.getDatasetMeta(a);if(r.type||(r.type=o.type||e.config.type),n.push(r.type),r.controller)r.controller.updateIndex(a);else{var s=t.controllers[r.type];if(void 0===s)throw new Error('"'+r.type+'" is not a chart type.');r.controller=new s(e,a),i.push(r.controller)}},e),n.length>1)for(var a=1;a<n.length;a++)if(n[a]!==n[a-1]){e.isCombo=!0;break}return i},resetElements:function(){var t=this;o.each(t.data.datasets,function(e,n){t.getDatasetMeta(n).controller.reset()},t)},reset:function(){this.resetElements(),this.tooltip.initialize()},update:function(t,e){var i=this;if(n(i),a.notify(i,"beforeUpdate")!==!1){i.tooltip._data=i.data;var r=i.buildOrUpdateControllers();o.each(i.data.datasets,function(t,e){i.getDatasetMeta(e).controller.buildOrUpdateElements()},i),i.updateLayout(),o.each(r,function(t){t.reset()}),i.updateDatasets(),a.notify(i,"afterUpdate"),i._bufferedRender?i._bufferedRequest={lazy:e,duration:t}:i.render(t,e)}},updateLayout:function(){var e=this;a.notify(e,"beforeLayout")!==!1&&(t.layoutService.update(this,this.width,this.height),a.notify(e,"afterScaleUpdate"),a.notify(e,"afterLayout"))},updateDatasets:function(){var t=this;if(a.notify(t,"beforeDatasetsUpdate")!==!1){for(var e=0,n=t.data.datasets.length;e<n;++e)t.updateDataset(e);a.notify(t,"afterDatasetsUpdate")}},updateDataset:function(t){var e=this,n=e.getDatasetMeta(t),i={meta:n,index:t};a.notify(e,"beforeDatasetUpdate",[i])!==!1&&(n.controller.update(),a.notify(e,"afterDatasetUpdate",[i]))},render:function(e,n){var i=this;if(a.notify(i,"beforeRender")!==!1){var r=i.options.animation,s=function(t){a.notify(i,"afterRender"),o.callback(r&&r.onComplete,[t],i)};if(r&&(void 0!==e&&0!==e||void 0===e&&0!==r.duration)){var l=new t.Animation({numSteps:(e||r.duration)/16.66,easing:r.easing,render:function(t,e){var n=o.easingEffects[e.easing],i=e.currentStep,a=i/e.numSteps;t.draw(n(a),a,i)},onAnimationProgress:r.onProgress,onAnimationComplete:s});t.animationService.addAnimation(i,l,e,n)}else i.draw(),s(new t.Animation({numSteps:0,chart:i}));return i}},draw:function(t){var e=this;e.clear(),void 0!==t&&null!==t||(t=1),e.transition(t),a.notify(e,"beforeDraw",[t])!==!1&&(o.each(e.boxes,function(t){t.draw(e.chartArea)},e),e.scale&&e.scale.draw(),e.drawDatasets(t),e.tooltip.draw(),a.notify(e,"afterDraw",[t]))},transition:function(t){for(var e=this,n=0,i=(e.data.datasets||[]).length;n<i;++n)e.isDatasetVisible(n)&&e.getDatasetMeta(n).controller.transition(t);e.tooltip.transition(t)},drawDatasets:function(t){var e=this;if(a.notify(e,"beforeDatasetsDraw",[t])!==!1){for(var n=(e.data.datasets||[]).length-1;n>=0;--n)e.isDatasetVisible(n)&&e.drawDataset(n,t);a.notify(e,"afterDatasetsDraw",[t])}},drawDataset:function(t,e){var n=this,i=n.getDatasetMeta(t),o={meta:i,index:t,easingValue:e};a.notify(n,"beforeDatasetDraw",[o])!==!1&&(i.controller.draw(e),a.notify(n,"afterDatasetDraw",[o]))},getElementAtEvent:function(e){return t.Interaction.modes.single(this,e)},getElementsAtEvent:function(e){return t.Interaction.modes.label(this,e,{intersect:!0})},getElementsAtXAxis:function(e){return t.Interaction.modes["x-axis"](this,e,{intersect:!0})},getElementsAtEventForMode:function(e,n,i){var o=t.Interaction.modes[n];return"function"==typeof o?o(this,e,i):[]},getDatasetAtEvent:function(e){return t.Interaction.modes.dataset(this,e,{intersect:!0})},getDatasetMeta:function(t){var e=this,n=e.data.datasets[t];n._meta||(n._meta={});var i=n._meta[e.id];return i||(i=n._meta[e.id]={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null}),i},getVisibleDatasetCount:function(){for(var t=0,e=0,n=this.data.datasets.length;e<n;++e)this.isDatasetVisible(e)&&t++;return t},isDatasetVisible:function(t){var e=this.getDatasetMeta(t);return"boolean"==typeof e.hidden?!e.hidden:!this.data.datasets[t].hidden},generateLegend:function(){return this.options.legendCallback(this)},destroy:function(){var e,n,i,s=this,l=s.canvas;for(s.stop(),n=0,i=s.data.datasets.length;n<i;++n)e=s.getDatasetMeta(n),e.controller&&(e.controller.destroy(),e.controller=null);l&&(s.unbindEvents(),o.clear(s),r.releaseContext(s.ctx),s.canvas=null,s.ctx=null),a.notify(s,"destroy"),delete t.instances[s.id]},toBase64Image:function(){return this.canvas.toDataURL.apply(this.canvas,arguments)},initToolTip:function(){var e=this;e.tooltip=new t.Tooltip({_chart:e,_chartInstance:e,_data:e.data,_options:e.options.tooltips},e),e.tooltip.initialize()},bindEvents:function(){var t=this,e=t._listeners={},n=function(){t.eventHandler.apply(t,arguments)};o.each(t.options.events,function(i){r.addEventListener(t,i,n),e[i]=n}),t.options.responsive&&(n=function(){t.resize()},r.addEventListener(t,"resize",n),e.resize=n)},unbindEvents:function(){var t=this,e=t._listeners;e&&(delete t._listeners,o.each(e,function(e,n){r.removeEventListener(t,n,e)}))},updateHoverStyle:function(t,e,n){var i,o,a,r=n?"setHoverStyle":"removeHoverStyle";for(o=0,a=t.length;o<a;++o)(i=t[o])&&this.getDatasetMeta(i._datasetIndex).controller[r](i)},eventHandler:function(t){var e=this,n=e.tooltip;if(a.notify(e,"beforeEvent",[t])!==!1){e._bufferedRender=!0,e._bufferedRequest=null;var i=e.handleEvent(t);i|=n&&n.handleEvent(t),a.notify(e,"afterEvent",[t]);var o=e._bufferedRequest;return o?e.render(o.duration,o.lazy):i&&!e.animating&&(e.stop(),e.render(e.options.hover.animationDuration,!0)),e._bufferedRender=!1,e._bufferedRequest=null,e}},handleEvent:function(t){var e=this,n=e.options||{},i=n.hover,a=!1;return e.lastActive=e.lastActive||[],"mouseout"===t.type?e.active=[]:e.active=e.getElementsAtEventForMode(t,i.mode,i),i.onHover&&i.onHover.call(e,t.native,e.active),"mouseup"!==t.type&&"click"!==t.type||n.onClick&&n.onClick.call(e,t.native,e.active),e.lastActive.length&&e.updateHoverStyle(e.lastActive,i.mode,!1),e.active.length&&i.mode&&e.updateHoverStyle(e.active,i.mode,!0),a=!o.arrayEquals(e.active,e.lastActive),e.lastActive=e.active,a}}),t.Controller=t}},{}],24:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){if(t._chartjs)return void t._chartjs.listeners.push(e);Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),o.forEach(function(e){var n="onData"+e.charAt(0).toUpperCase()+e.slice(1),o=t[e];Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:function(){var e=Array.prototype.slice.call(arguments),a=o.apply(this,e);return i.each(t._chartjs.listeners,function(t){"function"==typeof t[n]&&t[n].apply(t,e)}),a}})})}function n(t,e){var n=t._chartjs;if(n){var i=n.listeners,a=i.indexOf(e);a!==-1&&i.splice(a,1),i.length>0||(o.forEach(function(e){delete t[e]}),delete t._chartjs)}}var i=t.helpers,o=["push","pop","shift","splice","unshift"];t.DatasetController=function(t,e){this.initialize(t,e)},i.extend(t.DatasetController.prototype,{datasetElementType:null,dataElementType:null,initialize:function(t,e){var n=this;n.chart=t,n.index=e,n.linkScales(),n.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){var t=this,e=t.getMeta(),n=t.getDataset();null===e.xAxisID&&(e.xAxisID=n.xAxisID||t.chart.options.scales.xAxes[0].id),null===e.yAxisID&&(e.yAxisID=n.yAxisID||t.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getMeta:function(){return this.chart.getDatasetMeta(this.index)},getScaleForId:function(t){return this.chart.scales[t]},reset:function(){this.update(!0)},destroy:function(){this._data&&n(this._data,this)},createMetaDataset:function(){var t=this,e=t.datasetElementType;return e&&new e({_chart:t.chart,_datasetIndex:t.index})},createMetaData:function(t){var e=this,n=e.dataElementType;return n&&new n({_chart:e.chart,_datasetIndex:e.index,_index:t})},addElements:function(){var t,e,n=this,i=n.getMeta(),o=n.getDataset().data||[],a=i.data;for(t=0,e=o.length;t<e;++t)a[t]=a[t]||n.createMetaData(t);i.dataset=i.dataset||n.createMetaDataset()},addElementAndReset:function(t){var e=this.createMetaData(t);this.getMeta().data.splice(t,0,e),this.updateElement(e,t,!0)},buildOrUpdateElements:function(){var t=this,i=t.getDataset(),o=i.data||(i.data=[]);t._data!==o&&(t._data&&n(t._data,t),e(o,t),t._data=o),t.resyncElements()},update:i.noop,transition:function(t){for(var e=this.getMeta(),n=e.data||[],i=n.length,o=0;o<i;++o)n[o].transition(t);e.dataset&&e.dataset.transition(t)},draw:function(){var t=this.getMeta(),e=t.data||[],n=e.length,i=0;for(t.dataset&&t.dataset.draw();i<n;++i)e[i].draw()},removeHoverStyle:function(t,e){var n=this.chart.data.datasets[t._datasetIndex],o=t._index,a=t.custom||{},r=i.getValueAtIndexOrDefault,s=t._model;s.backgroundColor=a.backgroundColor?a.backgroundColor:r(n.backgroundColor,o,e.backgroundColor),s.borderColor=a.borderColor?a.borderColor:r(n.borderColor,o,e.borderColor),s.borderWidth=a.borderWidth?a.borderWidth:r(n.borderWidth,o,e.borderWidth)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],n=t._index,o=t.custom||{},a=i.getValueAtIndexOrDefault,r=i.getHoverColor,s=t._model;s.backgroundColor=o.hoverBackgroundColor?o.hoverBackgroundColor:a(e.hoverBackgroundColor,n,r(s.backgroundColor)),s.borderColor=o.hoverBorderColor?o.hoverBorderColor:a(e.hoverBorderColor,n,r(s.borderColor)),s.borderWidth=o.hoverBorderWidth?o.hoverBorderWidth:a(e.hoverBorderWidth,n,s.borderWidth)},resyncElements:function(){var t=this,e=t.getMeta(),n=t.getDataset().data,i=e.data.length,o=n.length;o<i?e.data.splice(o,i-o):o>i&&t.insertElements(i,o-i)},insertElements:function(t,e){for(var n=0;n<e;++n)this.addElementAndReset(t+n)},onDataPush:function(){this.insertElements(this.getDataset().data.length-1,arguments.length)},onDataPop:function(){this.getMeta().data.pop()},onDataShift:function(){this.getMeta().data.shift()},onDataSplice:function(t,e){this.getMeta().data.splice(t,e),this.insertElements(t,arguments.length-2)},onDataUnshift:function(){this.insertElements(0,arguments.length)}}),t.DatasetController.extend=i.inherits}},{}],25:[function(t,e,n){"use strict";var i=t(3);e.exports=function(t){function e(t,e,n,o){var a,r,s,l,c,u,d,h,p,f=Object.keys(n);for(a=0,r=f.length;a<r;++a)if(s=f[a],u=n[s],e.hasOwnProperty(s)||(e[s]=u),(l=e[s])!==u&&"_"!==s[0]){if(t.hasOwnProperty(s)||(t[s]=l),c=t[s],(d=typeof u)===typeof c)if("string"===d){if(h=i(c),h.valid&&(p=i(u),p.valid)){e[s]=p.mix(h,o).rgbString();continue}}else if("number"===d&&isFinite(c)&&isFinite(u)){e[s]=c+(u-c)*o;continue}e[s]=u}}var n=t.helpers;t.elements={},t.Element=function(t){n.extend(this,t),this.initialize.apply(this,arguments)},n.extend(t.Element.prototype,{initialize:function(){this.hidden=!1},pivot:function(){var t=this;return t._view||(t._view=n.clone(t._model)),t._start={},t},transition:function(t){var n=this,i=n._model,o=n._start,a=n._view;return i&&1!==t?(a||(a=n._view={}),o||(o=n._start={}),e(o,a,i,t),n):(n._view=i,n._start=null,n)},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return n.isNumber(this._model.x)&&n.isNumber(this._model.y)}}),t.Element.extend=n.inherits}},{3:3}],26:[function(t,e,n){"use strict";var i=t(3);e.exports=function(t){function e(t,e,n){var i;return"string"==typeof t?(i=parseInt(t,10),t.indexOf("%")!==-1&&(i=i/100*e.parentNode[n])):i=t,i}function n(t){return void 0!==t&&null!==t&&"none"!==t}function o(t,i,o){var a=document.defaultView,r=t.parentNode,s=a.getComputedStyle(t)[i],l=a.getComputedStyle(r)[i],c=n(s),u=n(l),d=Number.POSITIVE_INFINITY;return c||u?Math.min(c?e(s,t,o):d,u?e(l,r,o):d):"none"}var a=t.helpers={};a.each=function(t,e,n,i){var o,r;if(a.isArray(t))if(r=t.length,i)for(o=r-1;o>=0;o--)e.call(n,t[o],o);else for(o=0;o<r;o++)e.call(n,t[o],o);else if("object"==typeof t){var s=Object.keys(t);for(r=s.length,o=0;o<r;o++)e.call(n,t[s[o]],s[o])}},a.clone=function(t){var e={};return a.each(t,function(t,n){a.isArray(t)?e[n]=t.slice(0):e[n]="object"==typeof t&&null!==t?a.clone(t):t}),e},a.extend=function(t){for(var e=function(e,n){t[n]=e},n=1,i=arguments.length;n<i;n++)a.each(arguments[n],e);return t},a.configMerge=function(e){var n=a.clone(e);return a.each(Array.prototype.slice.call(arguments,1),function(e){a.each(e,function(e,i){var o=n.hasOwnProperty(i),r=o?n[i]:{};"scales"===i?n[i]=a.scaleMerge(r,e):"scale"===i?n[i]=a.configMerge(r,t.scaleService.getScaleDefaults(e.type),e):!o||"object"!=typeof r||a.isArray(r)||null===r||"object"!=typeof e||a.isArray(e)?n[i]=e:n[i]=a.configMerge(r,e)})}),n},a.scaleMerge=function(e,n){var i=a.clone(e);return a.each(n,function(e,n){"xAxes"===n||"yAxes"===n?i.hasOwnProperty(n)?a.each(e,function(e,o){var r=a.getValueOrDefault(e.type,"xAxes"===n?"category":"linear"),s=t.scaleService.getScaleDefaults(r);o>=i[n].length||!i[n][o].type?i[n].push(a.configMerge(s,e)):e.type&&e.type!==i[n][o].type?i[n][o]=a.configMerge(i[n][o],s,e):i[n][o]=a.configMerge(i[n][o],e)}):(i[n]=[],a.each(e,function(e){var o=a.getValueOrDefault(e.type,"xAxes"===n?"category":"linear");i[n].push(a.configMerge(t.scaleService.getScaleDefaults(o),e))})):i.hasOwnProperty(n)&&"object"==typeof i[n]&&null!==i[n]&&"object"==typeof e?i[n]=a.configMerge(i[n],e):i[n]=e}),i},a.getValueAtIndexOrDefault=function(t,e,n){return void 0===t||null===t?n:a.isArray(t)?e<t.length?t[e]:n:t},a.getValueOrDefault=function(t,e){return void 0===t?e:t},a.indexOf=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var n=0,i=t.length;n<i;++n)if(t[n]===e)return n;return-1},a.where=function(t,e){if(a.isArray(t)&&Array.prototype.filter)return t.filter(e);var n=[];return a.each(t,function(t){e(t)&&n.push(t)}),n},a.findIndex=Array.prototype.findIndex?function(t,e,n){return t.findIndex(e,n)}:function(t,e,n){n=void 0===n?t:n;for(var i=0,o=t.length;i<o;++i)if(e.call(n,t[i],i,t))return i;return-1},a.findNextWhere=function(t,e,n){void 0!==n&&null!==n||(n=-1);for(var i=n+1;i<t.length;i++){var o=t[i];if(e(o))return o}},a.findPreviousWhere=function(t,e,n){void 0!==n&&null!==n||(n=t.length);for(var i=n-1;i>=0;i--){var o=t[i];if(e(o))return o}},a.inherits=function(t){var e=this,n=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},i=function(){this.constructor=n};return i.prototype=e.prototype,n.prototype=new i,n.extend=a.inherits,t&&a.extend(n.prototype,t),n.__super__=e.prototype,n},a.noop=function(){},a.uid=function(){var t=0;return function(){return t++}}(),a.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},a.almostEquals=function(t,e,n){return Math.abs(t-e)<n},a.almostWhole=function(t,e){var n=Math.round(t);return n-e<t&&n+e>t},a.max=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.max(t,e)},Number.NEGATIVE_INFINITY)},a.min=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.min(t,e)},Number.POSITIVE_INFINITY)},a.sign=Math.sign?function(t){return Math.sign(t)}:function(t){return t=+t,0===t||isNaN(t)?t:t>0?1:-1},a.log10=Math.log10?function(t){return Math.log10(t)}:function(t){return Math.log(t)/Math.LN10},a.toRadians=function(t){return t*(Math.PI/180)},a.toDegrees=function(t){return t*(180/Math.PI)},a.getAngleFromPoint=function(t,e){var n=e.x-t.x,i=e.y-t.y,o=Math.sqrt(n*n+i*i),a=Math.atan2(i,n);return a<-.5*Math.PI&&(a+=2*Math.PI),{angle:a,distance:o}},a.distanceBetweenPoints=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},a.aliasPixel=function(t){return t%2==0?0:.5},a.splineCurve=function(t,e,n,i){var o=t.skip?e:t,a=e,r=n.skip?e:n,s=Math.sqrt(Math.pow(a.x-o.x,2)+Math.pow(a.y-o.y,2)),l=Math.sqrt(Math.pow(r.x-a.x,2)+Math.pow(r.y-a.y,2)),c=s/(s+l),u=l/(s+l);c=isNaN(c)?0:c,u=isNaN(u)?0:u;var d=i*c,h=i*u;return{previous:{x:a.x-d*(r.x-o.x),y:a.y-d*(r.y-o.y)},next:{x:a.x+h*(r.x-o.x),y:a.y+h*(r.y-o.y)}}},a.EPSILON=Number.EPSILON||1e-14,a.splineCurveMonotone=function(t){var e,n,i,o,r=(t||[]).map(function(t){return{model:t._model,deltaK:0,mK:0}}),s=r.length;for(e=0;e<s;++e)if(i=r[e],!i.model.skip){if(n=e>0?r[e-1]:null,(o=e<s-1?r[e+1]:null)&&!o.model.skip){var l=o.model.x-i.model.x;i.deltaK=0!==l?(o.model.y-i.model.y)/l:0}!n||n.model.skip?i.mK=i.deltaK:!o||o.model.skip?i.mK=n.deltaK:this.sign(n.deltaK)!==this.sign(i.deltaK)?i.mK=0:i.mK=(n.deltaK+i.deltaK)/2}var c,u,d,h;for(e=0;e<s-1;++e)i=r[e],o=r[e+1],i.model.skip||o.model.skip||(a.almostEquals(i.deltaK,0,this.EPSILON)?i.mK=o.mK=0:(c=i.mK/i.deltaK,u=o.mK/i.deltaK,(h=Math.pow(c,2)+Math.pow(u,2))<=9||(d=3/Math.sqrt(h),i.mK=c*d*i.deltaK,o.mK=u*d*i.deltaK)));var p;for(e=0;e<s;++e)i=r[e],i.model.skip||(n=e>0?r[e-1]:null,o=e<s-1?r[e+1]:null,n&&!n.model.skip&&(p=(i.model.x-n.model.x)/3,i.model.controlPointPreviousX=i.model.x-p,i.model.controlPointPreviousY=i.model.y-p*i.mK),o&&!o.model.skip&&(p=(o.model.x-i.model.x)/3,i.model.controlPointNextX=i.model.x+p,i.model.controlPointNextY=i.model.y+p*i.mK))},a.nextItem=function(t,e,n){return n?e>=t.length-1?t[0]:t[e+1]:e>=t.length-1?t[t.length-1]:t[e+1]},a.previousItem=function(t,e,n){return n?e<=0?t[t.length-1]:t[e-1]:e<=0?t[0]:t[e-1]},a.niceNum=function(t,e){var n=Math.floor(a.log10(t)),i=t/Math.pow(10,n);return(e?i<1.5?1:i<3?2:i<7?5:10:i<=1?1:i<=2?2:i<=5?5:10)*Math.pow(10,n)};var r=a.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(1-Math.pow(2,-10*t/1))},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1==(t/=1)?1:(n||(n=.3),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),-(i*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/n)))},easeOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1==(t/=1)?1:(n||(n=.3),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),i*Math.pow(2,-10*t)*Math.sin((1*t-e)*(2*Math.PI)/n)+1)},easeInOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:2==(t/=.5)?1:(n||(n=.3*1.5*1),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),t<1?-.5*(i*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/n)):i*Math.pow(2,-10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/n)*.5+1)},easeInBack:function(t){var e=1.70158;return 1*(t/=1)*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return 1*((t=t/1-1)*t*((e+1)*t+e)+1)},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},easeInBounce:function(t){return 1-r.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?7.5625*t*t*1:t<2/2.75?1*(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return t<.5?.5*r.easeInBounce(2*t):.5*r.easeOutBounce(2*t-1)+.5}};a.requestAnimFrame=function(){return"undefined"==typeof window?function(t){t()}:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),a.getRelativePosition=function(t,e){var n,i,o=t.originalEvent||t,r=t.currentTarget||t.srcElement,s=r.getBoundingClientRect(),l=o.touches;l&&l.length>0?(n=l[0].clientX,i=l[0].clientY):(n=o.clientX,i=o.clientY);var c=parseFloat(a.getStyle(r,"padding-left")),u=parseFloat(a.getStyle(r,"padding-top")),d=parseFloat(a.getStyle(r,"padding-right")),h=parseFloat(a.getStyle(r,"padding-bottom")),p=s.right-s.left-c-d,f=s.bottom-s.top-u-h;return n=Math.round((n-s.left-c)/p*r.width/e.currentDevicePixelRatio),i=Math.round((i-s.top-u)/f*r.height/e.currentDevicePixelRatio),{x:n,y:i}},a.addEvent=function(t,e,n){t.addEventListener?t.addEventListener(e,n):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n},a.removeEvent=function(t,e,n){t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent?t.detachEvent("on"+e,n):t["on"+e]=a.noop},a.getConstraintWidth=function(t){return o(t,"max-width","clientWidth")},a.getConstraintHeight=function(t){return o(t,"max-height","clientHeight")},a.getMaximumWidth=function(t){var e=t.parentNode,n=parseInt(a.getStyle(e,"padding-left"),10),i=parseInt(a.getStyle(e,"padding-right"),10),o=e.clientWidth-n-i,r=a.getConstraintWidth(t);return isNaN(r)?o:Math.min(o,r)},a.getMaximumHeight=function(t){var e=t.parentNode,n=parseInt(a.getStyle(e,"padding-top"),10),i=parseInt(a.getStyle(e,"padding-bottom"),10),o=e.clientHeight-n-i,r=a.getConstraintHeight(t);return isNaN(r)?o:Math.min(o,r)},a.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e)},a.retinaScale=function(t){var e=t.currentDevicePixelRatio=window.devicePixelRatio||1;if(1!==e){var n=t.canvas,i=t.height,o=t.width;n.height=i*e,n.width=o*e,t.ctx.scale(e,e),n.style.height=i+"px",n.style.width=o+"px"}},a.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},a.fontString=function(t,e,n){return e+" "+t+"px "+n},a.longestText=function(t,e,n,i){i=i||{};var o=i.data=i.data||{},r=i.garbageCollect=i.garbageCollect||[];i.font!==e&&(o=i.data={},r=i.garbageCollect=[],i.font=e),t.font=e;var s=0;a.each(n,function(e){void 0!==e&&null!==e&&a.isArray(e)!==!0?s=a.measureText(t,o,r,s,e):a.isArray(e)&&a.each(e,function(e){void 0===e||null===e||a.isArray(e)||(s=a.measureText(t,o,r,s,e))})});var l=r.length/2;if(l>n.length){for(var c=0;c<l;c++)delete o[r[c]];r.splice(0,l)}return s},a.measureText=function(t,e,n,i,o){var a=e[o];return a||(a=e[o]=t.measureText(o).width,n.push(o)),a>i&&(i=a),i},a.numberOfLabelLines=function(t){var e=1;return a.each(t,function(t){a.isArray(t)&&t.length>e&&(e=t.length)}),e},a.drawRoundedRectangle=function(t,e,n,i,o,a){t.beginPath(),t.moveTo(e+a,n),t.lineTo(e+i-a,n),t.quadraticCurveTo(e+i,n,e+i,n+a),t.lineTo(e+i,n+o-a),t.quadraticCurveTo(e+i,n+o,e+i-a,n+o),t.lineTo(e+a,n+o),t.quadraticCurveTo(e,n+o,e,n+o-a),t.lineTo(e,n+a),t.quadraticCurveTo(e,n,e+a,n),t.closePath()},a.color=i?function(e){return e instanceof CanvasGradient&&(e=t.defaults.global.defaultColor),i(e)}:function(t){return console.error("Color.js not found!"),t},a.isArray=Array.isArray?function(t){return Array.isArray(t)}:function(t){return"[object Array]"===Object.prototype.toString.call(t)},a.arrayEquals=function(t,e){var n,i,o,r;if(!t||!e||t.length!==e.length)return!1;for(n=0,i=t.length;n<i;++n)if(o=t[n],r=e[n],o instanceof Array&&r instanceof Array){if(!a.arrayEquals(o,r))return!1}else if(o!==r)return!1;return!0},a.callback=function(t,e,n){t&&"function"==typeof t.call&&t.apply(n,e)},a.getHoverColor=function(t){return t instanceof CanvasPattern?t:a.color(t).saturate(.5).darken(.1).rgbString()},a.callCallback=a.callback}},{3:3}],27:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){return t.native?{x:t.x,y:t.y}:r.getRelativePosition(t,e)}function n(t,e){var n,i,o,a,r,s=t.data.datasets;for(i=0,a=s.length;i<a;++i)if(t.isDatasetVisible(i))for(n=t.getDatasetMeta(i),o=0,r=n.data.length;o<r;++o){var l=n.data[o];l._view.skip||e(l)}}function i(t,e){var i=[];return n(t,function(t){t.inRange(e.x,e.y)&&i.push(t)}),i}function o(t,e,i,o){var a=Number.POSITIVE_INFINITY,s=[];return o||(o=r.distanceBetweenPoints),n(t,function(t){if(!i||t.inRange(e.x,e.y)){var n=t.getCenterPoint(),r=o(e,n);r<a?(s=[t],a=r):r===a&&s.push(t)}}),s}function a(t,n,a){var r=e(n,t),s=function(t,e){return Math.abs(t.x-e.x)},l=a.intersect?i(t,r):o(t,r,!1,s),c=[];return l.length?(t.data.datasets.forEach(function(e,n){if(t.isDatasetVisible(n)){var i=t.getDatasetMeta(n),o=i.data[l[0]._index];o&&!o._view.skip&&c.push(o)}}),c):[]}var r=t.helpers;t.Interaction={modes:{single:function(t,i){var o=e(i,t),a=[];return n(t,function(t){if(t.inRange(o.x,o.y))return a.push(t),a}),a.slice(0,1)},label:a,index:a,dataset:function(t,n,a){var r=e(n,t),s=a.intersect?i(t,r):o(t,r,!1);return s.length>0&&(s=t.getDatasetMeta(s[0]._datasetIndex).data),s},"x-axis":function(t,e){return a(t,e,!0)},point:function(t,n){return i(t,e(n,t))},nearest:function(t,n,i){var a=e(n,t),r=o(t,a,i.intersect);return r.length>1&&r.sort(function(t,e){var n=t.getArea(),i=e.getArea(),o=n-i;return 0===o&&(o=t._datasetIndex-e._datasetIndex),o}),r.slice(0,1)},x:function(t,i,o){var a=e(i,t),r=[],s=!1;return n(t,function(t){t.inXRange(a.x)&&r.push(t),t.inRange(a.x,a.y)&&(s=!0)}),o.intersect&&!s&&(r=[]),r},y:function(t,i,o){var a=e(i,t),r=[],s=!1;return n(t,function(t){t.inYRange(a.y)&&r.push(t),t.inRange(a.x,a.y)&&(s=!0)}),o.intersect&&!s&&(r=[]),r}}}}},{}],28:[function(t,e,n){"use strict";e.exports=function(){var t=function(t,e){return this.construct(t,e),this};return t.defaults={global:{responsive:!0,responsiveAnimationDuration:0,maintainAspectRatio:!0,events:["mousemove","mouseout","click","touchstart","touchmove"],hover:{onHover:null,mode:"nearest",intersect:!0,animationDuration:400},onClick:null,defaultColor:"rgba(0,0,0,0.1)",defaultFontColor:"#666",defaultFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",defaultFontSize:12,defaultFontStyle:"normal",showLines:!0,elements:{},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');for(var n=0;n<t.data.datasets.length;n++)e.push('<li><span style="background-color:'+t.data.datasets[n].backgroundColor+'"></span>'),t.data.datasets[n].label&&e.push(t.data.datasets[n].label),e.push("</li>");return e.push("</ul>"),e.join("")}}},t.Chart=t,t}},{}],29:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){return i.where(t,function(t){return t.position===e})}function n(t,e){t.forEach(function(t,e){return t._tmpIndex_=e,t}),t.sort(function(t,n){var i=e?n:t,o=e?t:n;return i.weight===o.weight?i._tmpIndex_-o._tmpIndex_:i.weight-o.weight}),t.forEach(function(t){delete t._tmpIndex_})}var i=t.helpers;t.layoutService={defaults:{},addBox:function(t,e){t.boxes||(t.boxes=[]),e.fullWidth=e.fullWidth||!1,e.position=e.position||"top",e.weight=e.weight||0,t.boxes.push(e)},removeBox:function(t,e){var n=t.boxes?t.boxes.indexOf(e):-1;n!==-1&&t.boxes.splice(n,1)},configure:function(t,e,n){for(var i,o=["fullWidth","position","weight"],a=o.length,r=0;r<a;++r)i=o[r],n.hasOwnProperty(i)&&(e[i]=n[i])},update:function(t,o,a){function r(t){var e,n=t.isHorizontal();n?(e=t.update(t.fullWidth?w:I,M),A-=e.height):(e=t.update(T,S),I-=e.width),P.push({horizontal:n,minSize:e,box:t})}function s(t){var e=i.findNextWhere(P,function(e){return e.box===t});if(e)if(t.isHorizontal()){var n={left:Math.max(L,D),right:Math.max(F,_),top:0,bottom:0};t.update(t.fullWidth?w:I,k/2,n)}else t.update(e.minSize.width,A)}function l(t){var e=i.findNextWhere(P,function(e){return e.box===t}),n={left:0,right:0,top:R,bottom:W};e&&t.update(e.minSize.width,A,n)}function c(t){t.isHorizontal()?(t.left=t.fullWidth?h:L,t.right=t.fullWidth?o-p:L+I,t.top=Y,t.bottom=Y+t.height,Y=t.bottom):(t.left=B,t.right=B+t.width,t.top=R,t.bottom=R+A,B=t.right)}if(t){var u=t.options.layout,d=u?u.padding:null,h=0,p=0,f=0,m=0;isNaN(d)?(h=d.left||0,p=d.right||0,f=d.top||0,m=d.bottom||0):(h=d,p=d,f=d,m=d);var g=e(t.boxes,"left"),v=e(t.boxes,"right"),y=e(t.boxes,"top"),b=e(t.boxes,"bottom"),x=e(t.boxes,"chartArea");n(g,!0),n(v,!1),n(y,!0),n(b,!1);var w=o-h-p,k=a-f-m,C=w/2,S=k/2,T=(o-C)/(g.length+v.length),M=(a-S)/(y.length+b.length),I=w,A=k,P=[];i.each(g.concat(v,y,b),r);var D=0,_=0,E=0,O=0;i.each(y.concat(b),function(t){if(t.getPadding){var e=t.getPadding();D=Math.max(D,e.left),_=Math.max(_,e.right)}}),i.each(g.concat(v),function(t){if(t.getPadding){var e=t.getPadding();E=Math.max(E,e.top),O=Math.max(O,e.bottom)}});var L=h,F=p,R=f,W=m;i.each(g.concat(v),s),i.each(g,function(t){L+=t.width}),i.each(v,function(t){F+=t.width}),i.each(y.concat(b),s),i.each(y,function(t){R+=t.height}),i.each(b,function(t){W+=t.height}),i.each(g.concat(v),l),L=h,F=p,R=f,W=m,i.each(g,function(t){L+=t.width}),i.each(v,function(t){F+=t.width}),i.each(y,function(t){R+=t.height}),i.each(b,function(t){W+=t.height});var V=Math.max(D-L,0);L+=V,F+=Math.max(_-F,0);var z=Math.max(E-R,0);R+=z,W+=Math.max(O-W,0);var N=a-R-W,H=o-L-F;H===I&&N===A||(i.each(g,function(t){t.height=N}),i.each(v,function(t){t.height=N}),i.each(y,function(t){t.fullWidth||(t.width=H)}),i.each(b,function(t){t.fullWidth||(t.width=H)}),A=N,I=H);var B=h+V,Y=f+z;i.each(g.concat(y),c),B+=I,Y+=A,i.each(v,c),i.each(b,c),t.chartArea={left:L,top:R,right:L+I,bottom:R+A},i.each(x,function(e){e.left=t.chartArea.left,e.top=t.chartArea.top,e.right=t.chartArea.right,e.bottom=t.chartArea.bottom,e.update(I,A)})}}}}},{}],30:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.plugins={},t.plugins={_plugins:[],_cacheId:0,register:function(t){var e=this._plugins;[].concat(t).forEach(function(t){e.indexOf(t)===-1&&e.push(t)}),this._cacheId++},unregister:function(t){var e=this._plugins;[].concat(t).forEach(function(t){var n=e.indexOf(t);n!==-1&&e.splice(n,1)}),this._cacheId++},clear:function(){this._plugins=[],this._cacheId++},count:function(){return this._plugins.length},getAll:function(){return this._plugins},notify:function(t,e,n){var i,o,a,r,s,l=this.descriptors(t),c=l.length;for(i=0;i<c;++i)if(o=l[i],a=o.plugin,"function"==typeof(s=a[e])&&(r=[t].concat(n||[]),r.push(o.options),s.apply(a,r)===!1))return!1;return!0},descriptors:function(n){var i=n._plugins||(n._plugins={});if(i.id===this._cacheId)return i.descriptors;var o=[],a=[],r=n&&n.config||{},s=t.defaults.global.plugins,l=r.options&&r.options.plugins||{};return this._plugins.concat(r.plugins||[]).forEach(function(t){if(o.indexOf(t)===-1){var n=t.id,i=l[n];i!==!1&&(i===!0&&(i=e.clone(s[n])),o.push(t),a.push({plugin:t,options:i||{}}))}}),i.descriptors=a,i.id=this._cacheId,a}},t.pluginService=t.plugins,t.PluginBase=t.Element.extend({})}},{}],31:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e,n){return i.isArray(e)?i.longestText(t,n,e):t.measureText(e).width}function n(e){var n=i.getValueOrDefault,o=t.defaults.global,a=n(e.fontSize,o.defaultFontSize),r=n(e.fontStyle,o.defaultFontStyle),s=n(e.fontFamily,o.defaultFontFamily);return{size:a,style:r,family:s,font:i.fontString(a,r,s)}}var i=t.helpers;t.defaults.scale={display:!0,position:"left",gridLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,drawBorder:!0,drawOnChartArea:!0,drawTicks:!0,tickMarkLength:10,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",zeroLineBorderDash:[],zeroLineBorderDashOffset:0,offsetGridLines:!1,borderDash:[],borderDashOffset:0},scaleLabel:{labelString:"",display:!1},ticks:{beginAtZero:!1,minRotation:0,maxRotation:50,mirror:!1,padding:0,reverse:!1,display:!0,autoSkip:!0,autoSkipPadding:0,labelOffset:0,callback:t.Ticks.formatters.values}},t.Scale=t.Element.extend({getPadding:function(){var t=this;return{left:t.paddingLeft||0,top:t.paddingTop||0,right:t.paddingRight||0,bottom:t.paddingBottom||0}},beforeUpdate:function(){
i.callback(this.options.beforeUpdate,[this])},update:function(t,e,n){var o=this;return o.beforeUpdate(),o.maxWidth=t,o.maxHeight=e,o.margins=i.extend({left:0,right:0,top:0,bottom:0},n),o.longestTextCache=o.longestTextCache||{},o.beforeSetDimensions(),o.setDimensions(),o.afterSetDimensions(),o.beforeDataLimits(),o.determineDataLimits(),o.afterDataLimits(),o.beforeBuildTicks(),o.buildTicks(),o.afterBuildTicks(),o.beforeTickToLabelConversion(),o.convertTicksToLabels(),o.afterTickToLabelConversion(),o.beforeCalculateTickRotation(),o.calculateTickRotation(),o.afterCalculateTickRotation(),o.beforeFit(),o.fit(),o.afterFit(),o.afterUpdate(),o.minSize},afterUpdate:function(){i.callback(this.options.afterUpdate,[this])},beforeSetDimensions:function(){i.callback(this.options.beforeSetDimensions,[this])},setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0},afterSetDimensions:function(){i.callback(this.options.afterSetDimensions,[this])},beforeDataLimits:function(){i.callback(this.options.beforeDataLimits,[this])},determineDataLimits:i.noop,afterDataLimits:function(){i.callback(this.options.afterDataLimits,[this])},beforeBuildTicks:function(){i.callback(this.options.beforeBuildTicks,[this])},buildTicks:i.noop,afterBuildTicks:function(){i.callback(this.options.afterBuildTicks,[this])},beforeTickToLabelConversion:function(){i.callback(this.options.beforeTickToLabelConversion,[this])},convertTicksToLabels:function(){var t=this,e=t.options.ticks;t.ticks=t.ticks.map(e.userCallback||e.callback)},afterTickToLabelConversion:function(){i.callback(this.options.afterTickToLabelConversion,[this])},beforeCalculateTickRotation:function(){i.callback(this.options.beforeCalculateTickRotation,[this])},calculateTickRotation:function(){var t=this,e=t.ctx,o=t.options.ticks,a=n(o);e.font=a.font;var r=o.minRotation||0;if(t.options.display&&t.isHorizontal())for(var s,l=i.longestText(e,a.font,t.ticks,t.longestTextCache),c=l,u=t.getPixelForTick(1)-t.getPixelForTick(0)-6;c>u&&r<o.maxRotation;){var d=i.toRadians(r);if(s=Math.cos(d),Math.sin(d)*l>t.maxHeight){r--;break}r++,c=s*l}t.labelRotation=r},afterCalculateTickRotation:function(){i.callback(this.options.afterCalculateTickRotation,[this])},beforeFit:function(){i.callback(this.options.beforeFit,[this])},fit:function(){var t=this,o=t.minSize={width:0,height:0},a=t.options,r=a.ticks,s=a.scaleLabel,l=a.gridLines,c=a.display,u=t.isHorizontal(),d=n(r),h=1.5*n(s).size,p=a.gridLines.tickMarkLength;if(o.width=u?t.isFullWidth()?t.maxWidth-t.margins.left-t.margins.right:t.maxWidth:c&&l.drawTicks?p:0,o.height=u?c&&l.drawTicks?p:0:t.maxHeight,s.display&&c&&(u?o.height+=h:o.width+=h),r.display&&c){var f=i.longestText(t.ctx,d.font,t.ticks,t.longestTextCache),m=i.numberOfLabelLines(t.ticks),g=.5*d.size;if(u){t.longestLabelWidth=f;var v=i.toRadians(t.labelRotation),y=Math.cos(v),b=Math.sin(v),x=b*f+d.size*m+g*m;o.height=Math.min(t.maxHeight,o.height+x),t.ctx.font=d.font;var w=t.ticks[0],k=e(t.ctx,w,d.font),C=t.ticks[t.ticks.length-1],S=e(t.ctx,C,d.font);0!==t.labelRotation?(t.paddingLeft="bottom"===a.position?y*k+3:y*g+3,t.paddingRight="bottom"===a.position?y*g+3:y*S+3):(t.paddingLeft=k/2+3,t.paddingRight=S/2+3)}else r.mirror?f=0:f+=t.options.ticks.padding,o.width=Math.min(t.maxWidth,o.width+f),t.paddingTop=d.size/2,t.paddingBottom=d.size/2}t.handleMargins(),t.width=o.width,t.height=o.height},handleMargins:function(){var t=this;t.margins&&(t.paddingLeft=Math.max(t.paddingLeft-t.margins.left,0),t.paddingTop=Math.max(t.paddingTop-t.margins.top,0),t.paddingRight=Math.max(t.paddingRight-t.margins.right,0),t.paddingBottom=Math.max(t.paddingBottom-t.margins.bottom,0))},afterFit:function(){i.callback(this.options.afterFit,[this])},isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},isFullWidth:function(){return this.options.fullWidth},getRightValue:function(t){return null===t||void 0===t?NaN:"number"!=typeof t||isFinite(t)?"object"==typeof t?t instanceof Date||t.isValid?t:this.getRightValue(this.isHorizontal()?t.x:t.y):t:NaN},getLabelForIndex:i.noop,getPixelForValue:i.noop,getValueForPixel:i.noop,getPixelForTick:function(t,e){var n=this;if(n.isHorizontal()){var i=n.width-(n.paddingLeft+n.paddingRight),o=i/Math.max(n.ticks.length-(n.options.gridLines.offsetGridLines?0:1),1),a=o*t+n.paddingLeft;e&&(a+=o/2);var r=n.left+Math.round(a);return r+=n.isFullWidth()?n.margins.left:0}var s=n.height-(n.paddingTop+n.paddingBottom);return n.top+t*(s/(n.ticks.length-1))},getPixelForDecimal:function(t){var e=this;if(e.isHorizontal()){var n=e.width-(e.paddingLeft+e.paddingRight),i=n*t+e.paddingLeft,o=e.left+Math.round(i);return o+=e.isFullWidth()?e.margins.left:0}return e.top+t*e.height},getBasePixel:function(){return this.getPixelForValue(this.getBaseValue())},getBaseValue:function(){var t=this,e=t.min,n=t.max;return t.beginAtZero?0:e<0&&n<0?n:e>0&&n>0?e:0},draw:function(e){var o=this,a=o.options;if(a.display){var r,s,l=o.ctx,c=t.defaults.global,u=a.ticks,d=a.gridLines,h=a.scaleLabel,p=0!==o.labelRotation,f=u.autoSkip,m=o.isHorizontal();u.maxTicksLimit&&(s=u.maxTicksLimit);var g=i.getValueOrDefault(u.fontColor,c.defaultFontColor),v=n(u),y=d.drawTicks?d.tickMarkLength:0,b=i.getValueOrDefault(h.fontColor,c.defaultFontColor),x=n(h),w=i.toRadians(o.labelRotation),k=Math.cos(w),C=o.longestLabelWidth*k;l.fillStyle=g;var S=[];if(m){if(r=!1,(C+u.autoSkipPadding)*o.ticks.length>o.width-(o.paddingLeft+o.paddingRight)&&(r=1+Math.floor((C+u.autoSkipPadding)*o.ticks.length/(o.width-(o.paddingLeft+o.paddingRight)))),s&&o.ticks.length>s)for(;!r||o.ticks.length/(r||1)>s;)r||(r=1),r+=1;f||(r=!1)}var T="right"===a.position?o.left:o.right-y,M="right"===a.position?o.left+y:o.right,I="bottom"===a.position?o.top:o.bottom-y,A="bottom"===a.position?o.top+y:o.bottom;if(i.each(o.ticks,function(t,n){if(void 0!==t&&null!==t){var s=o.ticks.length===n+1;if((!(r>1&&n%r>0||n%r==0&&n+r>=o.ticks.length)||s)&&void 0!==t&&null!==t){var l,h,f,g;n===(void 0!==o.zeroLineIndex?o.zeroLineIndex:0)?(l=d.zeroLineWidth,h=d.zeroLineColor,f=d.zeroLineBorderDash,g=d.zeroLineBorderDashOffset):(l=i.getValueAtIndexOrDefault(d.lineWidth,n),h=i.getValueAtIndexOrDefault(d.color,n),f=i.getValueOrDefault(d.borderDash,c.borderDash),g=i.getValueOrDefault(d.borderDashOffset,c.borderDashOffset));var v,b,x,k,C,P,D,_,E,O,L="middle",F="middle";if(m){"bottom"===a.position?(F=p?"middle":"top",L=p?"right":"center",O=o.top+y):(F=p?"middle":"bottom",L=p?"left":"center",O=o.bottom-y);var R=o.getPixelForTick(n)+i.aliasPixel(l);E=o.getPixelForTick(n,d.offsetGridLines)+u.labelOffset,v=x=C=D=R,b=I,k=A,P=e.top,_=e.bottom}else{var W,V="left"===a.position,z=u.padding;u.mirror?(L=V?"left":"right",W=z):(L=V?"right":"left",W=y+z),E=V?o.right-W:o.left+W;var N=o.getPixelForTick(n);N+=i.aliasPixel(l),O=o.getPixelForTick(n,d.offsetGridLines),v=T,x=M,C=e.left,D=e.right,b=k=P=_=N}S.push({tx1:v,ty1:b,tx2:x,ty2:k,x1:C,y1:P,x2:D,y2:_,labelX:E,labelY:O,glWidth:l,glColor:h,glBorderDash:f,glBorderDashOffset:g,rotation:-1*w,label:t,textBaseline:F,textAlign:L})}}}),i.each(S,function(t){if(d.display&&(l.save(),l.lineWidth=t.glWidth,l.strokeStyle=t.glColor,l.setLineDash&&(l.setLineDash(t.glBorderDash),l.lineDashOffset=t.glBorderDashOffset),l.beginPath(),d.drawTicks&&(l.moveTo(t.tx1,t.ty1),l.lineTo(t.tx2,t.ty2)),d.drawOnChartArea&&(l.moveTo(t.x1,t.y1),l.lineTo(t.x2,t.y2)),l.stroke(),l.restore()),u.display){l.save(),l.translate(t.labelX,t.labelY),l.rotate(t.rotation),l.font=v.font,l.textBaseline=t.textBaseline,l.textAlign=t.textAlign;var e=t.label;if(i.isArray(e))for(var n=0,o=0;n<e.length;++n)l.fillText(""+e[n],0,o),o+=1.5*v.size;else l.fillText(e,0,0);l.restore()}}),h.display){var P,D,_=0;if(m)P=o.left+(o.right-o.left)/2,D="bottom"===a.position?o.bottom-x.size/2:o.top+x.size/2;else{var E="left"===a.position;P=E?o.left+x.size/2:o.right-x.size/2,D=o.top+(o.bottom-o.top)/2,_=E?-.5*Math.PI:.5*Math.PI}l.save(),l.translate(P,D),l.rotate(_),l.textAlign="center",l.textBaseline="middle",l.fillStyle=b,l.font=x.font,l.fillText(h.labelString,0,0),l.restore()}if(d.drawBorder){l.lineWidth=i.getValueAtIndexOrDefault(d.lineWidth,0),l.strokeStyle=i.getValueAtIndexOrDefault(d.color,0);var O=o.left,L=o.right,F=o.top,R=o.bottom,W=i.aliasPixel(l.lineWidth);m?(F=R="top"===a.position?o.bottom:o.top,F+=W,R+=W):(O=L="left"===a.position?o.right:o.left,O+=W,L+=W),l.beginPath(),l.moveTo(O,F),l.lineTo(L,R),l.stroke()}}}})}},{}],32:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.scaleService={constructors:{},defaults:{},registerScaleType:function(t,n,i){this.constructors[t]=n,this.defaults[t]=e.clone(i)},getScaleConstructor:function(t){return this.constructors.hasOwnProperty(t)?this.constructors[t]:void 0},getScaleDefaults:function(n){return this.defaults.hasOwnProperty(n)?e.scaleMerge(t.defaults.scale,this.defaults[n]):{}},updateScaleDefaults:function(t,n){var i=this.defaults;i.hasOwnProperty(t)&&(i[t]=e.extend(i[t],n))},addScalesToLayout:function(n){e.each(n.scales,function(e){e.fullWidth=e.options.fullWidth,e.position=e.options.position,e.weight=e.options.weight,t.layoutService.addBox(n,e)})}}}},{}],33:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers;t.Ticks={generators:{linear:function(t,n){var i,o=[];if(t.stepSize&&t.stepSize>0)i=t.stepSize;else{var a=e.niceNum(n.max-n.min,!1);i=e.niceNum(a/(t.maxTicks-1),!0)}var r=Math.floor(n.min/i)*i,s=Math.ceil(n.max/i)*i;t.min&&t.max&&t.stepSize&&e.almostWhole((t.max-t.min)/t.stepSize,i/1e3)&&(r=t.min,s=t.max);var l=(s-r)/i;l=e.almostEquals(l,Math.round(l),i/1e3)?Math.round(l):Math.ceil(l),o.push(void 0!==t.min?t.min:r);for(var c=1;c<l;++c)o.push(r+c*i);return o.push(void 0!==t.max?t.max:s),o},logarithmic:function(t,n){var i,o,a=[],r=e.getValueOrDefault,s=r(t.min,Math.pow(10,Math.floor(e.log10(n.min)))),l=Math.floor(e.log10(n.max)),c=Math.ceil(n.max/Math.pow(10,l));0===s?(i=Math.floor(e.log10(n.minNotZero)),o=Math.floor(n.minNotZero/Math.pow(10,i)),a.push(s),s=o*Math.pow(10,i)):(i=Math.floor(e.log10(s)),o=Math.floor(s/Math.pow(10,i)));do{a.push(s),++o,10===o&&(o=1,++i),s=o*Math.pow(10,i)}while(i<l||i===l&&o<c);var u=r(t.max,s);return a.push(u),a}},formatters:{values:function(t){return e.isArray(t)?t:""+t},linear:function(t,n,i){var o=i.length>3?i[2]-i[1]:i[1]-i[0];Math.abs(o)>1&&t!==Math.floor(t)&&(o=t-Math.floor(t));var a=e.log10(Math.abs(o)),r="";if(0!==t){var s=-1*Math.floor(a);s=Math.max(Math.min(s,20),0),r=t.toFixed(s)}else r="0";return r},logarithmic:function(t,n,i){var o=t/Math.pow(10,Math.floor(e.log10(t)));return 0===t?"0":1===o||2===o||5===o||0===n||n===i.length-1?t.toExponential():""}}}}},{}],34:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){var n=l.color(t);return n.alpha(e*n.alpha()).rgbaString()}function n(t,e){return e&&(l.isArray(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function i(t){var e=t._xScale,n=t._yScale||t._scale,i=t._index,o=t._datasetIndex;return{xLabel:e?e.getLabelForIndex(i,o):"",yLabel:n?n.getLabelForIndex(i,o):"",index:i,datasetIndex:o,x:t._model.x,y:t._model.y}}function o(e){var n=t.defaults.global,i=l.getValueOrDefault;return{xPadding:e.xPadding,yPadding:e.yPadding,xAlign:e.xAlign,yAlign:e.yAlign,bodyFontColor:e.bodyFontColor,_bodyFontFamily:i(e.bodyFontFamily,n.defaultFontFamily),_bodyFontStyle:i(e.bodyFontStyle,n.defaultFontStyle),_bodyAlign:e.bodyAlign,bodyFontSize:i(e.bodyFontSize,n.defaultFontSize),bodySpacing:e.bodySpacing,titleFontColor:e.titleFontColor,_titleFontFamily:i(e.titleFontFamily,n.defaultFontFamily),_titleFontStyle:i(e.titleFontStyle,n.defaultFontStyle),titleFontSize:i(e.titleFontSize,n.defaultFontSize),_titleAlign:e.titleAlign,titleSpacing:e.titleSpacing,titleMarginBottom:e.titleMarginBottom,footerFontColor:e.footerFontColor,_footerFontFamily:i(e.footerFontFamily,n.defaultFontFamily),_footerFontStyle:i(e.footerFontStyle,n.defaultFontStyle),footerFontSize:i(e.footerFontSize,n.defaultFontSize),_footerAlign:e.footerAlign,footerSpacing:e.footerSpacing,footerMarginTop:e.footerMarginTop,caretSize:e.caretSize,cornerRadius:e.cornerRadius,backgroundColor:e.backgroundColor,opacity:0,legendColorBackground:e.multiKeyBackground,displayColors:e.displayColors,borderColor:e.borderColor,borderWidth:e.borderWidth}}function a(t,e){var n=t._chart.ctx,i=2*e.yPadding,o=0,a=e.body,r=a.reduce(function(t,e){return t+e.before.length+e.lines.length+e.after.length},0);r+=e.beforeBody.length+e.afterBody.length;var s=e.title.length,c=e.footer.length,u=e.titleFontSize,d=e.bodyFontSize,h=e.footerFontSize;i+=s*u,i+=s?(s-1)*e.titleSpacing:0,i+=s?e.titleMarginBottom:0,i+=r*d,i+=r?(r-1)*e.bodySpacing:0,i+=c?e.footerMarginTop:0,i+=c*h,i+=c?(c-1)*e.footerSpacing:0;var p=0,f=function(t){o=Math.max(o,n.measureText(t).width+p)};return n.font=l.fontString(u,e._titleFontStyle,e._titleFontFamily),l.each(e.title,f),n.font=l.fontString(d,e._bodyFontStyle,e._bodyFontFamily),l.each(e.beforeBody.concat(e.afterBody),f),p=e.displayColors?d+2:0,l.each(a,function(t){l.each(t.before,f),l.each(t.lines,f),l.each(t.after,f)}),p=0,n.font=l.fontString(h,e._footerFontStyle,e._footerFontFamily),l.each(e.footer,f),o+=2*e.xPadding,{width:o,height:i}}function r(t,e){var n=t._model,i=t._chart,o=t._chart.chartArea,a="center",r="center";n.y<e.height?r="top":n.y>i.height-e.height&&(r="bottom");var s,l,c,u,d,h=(o.left+o.right)/2,p=(o.top+o.bottom)/2;"center"===r?(s=function(t){return t<=h},l=function(t){return t>h}):(s=function(t){return t<=e.width/2},l=function(t){return t>=i.width-e.width/2}),c=function(t){return t+e.width>i.width},u=function(t){return t-e.width<0},d=function(t){return t<=p?"top":"bottom"},s(n.x)?(a="left",c(n.x)&&(a="center",r=d(n.y))):l(n.x)&&(a="right",u(n.x)&&(a="center",r=d(n.y)));var f=t._options;return{xAlign:f.xAlign?f.xAlign:a,yAlign:f.yAlign?f.yAlign:r}}function s(t,e,n){var i=t.x,o=t.y,a=t.caretSize,r=t.caretPadding,s=t.cornerRadius,l=n.xAlign,c=n.yAlign,u=a+r,d=s+r;return"right"===l?i-=e.width:"center"===l&&(i-=e.width/2),"top"===c?o+=u:o-="bottom"===c?e.height+u:e.height/2,"center"===c?"left"===l?i+=u:"right"===l&&(i-=u):"left"===l?i-=d:"right"===l&&(i+=d),{x:i,y:o}}var l=t.helpers;t.defaults.global.tooltips={enabled:!0,custom:null,mode:"nearest",position:"average",intersect:!0,backgroundColor:"rgba(0,0,0,0.8)",titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleFontColor:"#fff",titleAlign:"left",bodySpacing:2,bodyFontColor:"#fff",bodyAlign:"left",footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerFontColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,caretPadding:2,caretSize:5,cornerRadius:6,multiKeyBackground:"#fff",displayColors:!0,borderColor:"rgba(0,0,0,0)",borderWidth:0,callbacks:{beforeTitle:l.noop,title:function(t,e){var n="",i=e.labels,o=i?i.length:0;if(t.length>0){var a=t[0];a.xLabel?n=a.xLabel:o>0&&a.index<o&&(n=i[a.index])}return n},afterTitle:l.noop,beforeBody:l.noop,beforeLabel:l.noop,label:function(t,e){var n=e.datasets[t.datasetIndex].label||"";return n&&(n+=": "),n+=t.yLabel},labelColor:function(t,e){var n=e.getDatasetMeta(t.datasetIndex),i=n.data[t.index],o=i._view;return{borderColor:o.borderColor,backgroundColor:o.backgroundColor}},afterLabel:l.noop,afterBody:l.noop,beforeFooter:l.noop,footer:l.noop,afterFooter:l.noop}},t.Tooltip=t.Element.extend({initialize:function(){this._model=o(this._options)},getTitle:function(){var t=this,e=t._options,i=e.callbacks,o=i.beforeTitle.apply(t,arguments),a=i.title.apply(t,arguments),r=i.afterTitle.apply(t,arguments),s=[];return s=n(s,o),s=n(s,a),s=n(s,r)},getBeforeBody:function(){var t=this._options.callbacks.beforeBody.apply(this,arguments);return l.isArray(t)?t:void 0!==t?[t]:[]},getBody:function(t,e){var i=this,o=i._options.callbacks,a=[];return l.each(t,function(t){var r={before:[],lines:[],after:[]};n(r.before,o.beforeLabel.call(i,t,e)),n(r.lines,o.label.call(i,t,e)),n(r.after,o.afterLabel.call(i,t,e)),a.push(r)}),a},getAfterBody:function(){var t=this._options.callbacks.afterBody.apply(this,arguments);return l.isArray(t)?t:void 0!==t?[t]:[]},getFooter:function(){var t=this,e=t._options.callbacks,i=e.beforeFooter.apply(t,arguments),o=e.footer.apply(t,arguments),a=e.afterFooter.apply(t,arguments),r=[];return r=n(r,i),r=n(r,o),r=n(r,a)},update:function(e){var n,c,u=this,d=u._options,h=u._model,p=u._model=o(d),f=u._active,m=u._data,g={xAlign:h.xAlign,yAlign:h.yAlign},v={x:h.x,y:h.y},y={width:h.width,height:h.height},b={x:h.caretX,y:h.caretY};if(f.length){p.opacity=1;var x=[];b=t.Tooltip.positioners[d.position](f,u._eventPosition);var w=[];for(n=0,c=f.length;n<c;++n)w.push(i(f[n]));d.filter&&(w=w.filter(function(t){return d.filter(t,m)})),d.itemSort&&(w=w.sort(function(t,e){return d.itemSort(t,e,m)})),l.each(w,function(t){x.push(d.callbacks.labelColor.call(u,t,u._chart))}),p.title=u.getTitle(w,m),p.beforeBody=u.getBeforeBody(w,m),p.body=u.getBody(w,m),p.afterBody=u.getAfterBody(w,m),p.footer=u.getFooter(w,m),p.x=Math.round(b.x),p.y=Math.round(b.y),p.caretPadding=d.caretPadding,p.labelColors=x,p.dataPoints=w,y=a(this,p),g=r(this,y),v=s(p,y,g)}else p.opacity=0;return p.xAlign=g.xAlign,p.yAlign=g.yAlign,p.x=v.x,p.y=v.y,p.width=y.width,p.height=y.height,p.caretX=b.x,p.caretY=b.y,u._model=p,e&&d.custom&&d.custom.call(u,p),u},drawCaret:function(t,e){var n=this._chart.ctx,i=this._view,o=this.getCaretPosition(t,e,i);n.lineTo(o.x1,o.y1),n.lineTo(o.x2,o.y2),n.lineTo(o.x3,o.y3)},getCaretPosition:function(t,e,n){var i,o,a,r,s,l,c=n.caretSize,u=n.cornerRadius,d=n.xAlign,h=n.yAlign,p=t.x,f=t.y,m=e.width,g=e.height;if("center"===h)s=f+g/2,"left"===d?(i=p,o=i-c,a=i,r=s+c,l=s-c):(i=p+m,o=i+c,a=i,r=s-c,l=s+c);else if("left"===d?(o=p+u+c,i=o-c,a=o+c):"right"===d?(o=p+m-u-c,i=o-c,a=o+c):(o=p+m/2,i=o-c,a=o+c),"top"===h)r=f,s=r-c,l=r;else{r=f+g,s=r+c,l=r;var v=a;a=i,i=v}return{x1:i,x2:o,x3:a,y1:r,y2:s,y3:l}},drawTitle:function(t,n,i,o){var a=n.title;if(a.length){i.textAlign=n._titleAlign,i.textBaseline="top";var r=n.titleFontSize,s=n.titleSpacing;i.fillStyle=e(n.titleFontColor,o),i.font=l.fontString(r,n._titleFontStyle,n._titleFontFamily);var c,u;for(c=0,u=a.length;c<u;++c)i.fillText(a[c],t.x,t.y),t.y+=r+s,c+1===a.length&&(t.y+=n.titleMarginBottom-s)}},drawBody:function(t,n,i,o){var a=n.bodyFontSize,r=n.bodySpacing,s=n.body;i.textAlign=n._bodyAlign,i.textBaseline="top";var c=e(n.bodyFontColor,o);i.fillStyle=c,i.font=l.fontString(a,n._bodyFontStyle,n._bodyFontFamily);var u=0,d=function(e){i.fillText(e,t.x+u,t.y),t.y+=a+r};l.each(n.beforeBody,d);var h=n.displayColors;u=h?a+2:0,l.each(s,function(r,s){l.each(r.before,d),l.each(r.lines,function(r){h&&(i.fillStyle=e(n.legendColorBackground,o),i.fillRect(t.x,t.y,a,a),i.strokeStyle=e(n.labelColors[s].borderColor,o),i.strokeRect(t.x,t.y,a,a),i.fillStyle=e(n.labelColors[s].backgroundColor,o),i.fillRect(t.x+1,t.y+1,a-2,a-2),i.fillStyle=c),d(r)}),l.each(r.after,d)}),u=0,l.each(n.afterBody,d),t.y-=r},drawFooter:function(t,n,i,o){var a=n.footer;a.length&&(t.y+=n.footerMarginTop,i.textAlign=n._footerAlign,i.textBaseline="top",i.fillStyle=e(n.footerFontColor,o),i.font=l.fontString(n.footerFontSize,n._footerFontStyle,n._footerFontFamily),l.each(a,function(e){i.fillText(e,t.x,t.y),t.y+=n.footerFontSize+n.footerSpacing}))},drawBackground:function(t,n,i,o,a){i.fillStyle=e(n.backgroundColor,a),i.strokeStyle=e(n.borderColor,a),i.lineWidth=n.borderWidth;var r=n.xAlign,s=n.yAlign,l=t.x,c=t.y,u=o.width,d=o.height,h=n.cornerRadius;i.beginPath(),i.moveTo(l+h,c),"top"===s&&this.drawCaret(t,o),i.lineTo(l+u-h,c),i.quadraticCurveTo(l+u,c,l+u,c+h),"center"===s&&"right"===r&&this.drawCaret(t,o),i.lineTo(l+u,c+d-h),i.quadraticCurveTo(l+u,c+d,l+u-h,c+d),"bottom"===s&&this.drawCaret(t,o),i.lineTo(l+h,c+d),i.quadraticCurveTo(l,c+d,l,c+d-h),"center"===s&&"left"===r&&this.drawCaret(t,o),i.lineTo(l,c+h),i.quadraticCurveTo(l,c,l+h,c),i.closePath(),i.fill(),n.borderWidth>0&&i.stroke()},draw:function(){var t=this._chart.ctx,e=this._view;if(0!==e.opacity){var n={width:e.width,height:e.height},i={x:e.x,y:e.y},o=Math.abs(e.opacity<.001)?0:e.opacity,a=e.title.length||e.beforeBody.length||e.body.length||e.afterBody.length||e.footer.length;this._options.enabled&&a&&(this.drawBackground(i,e,t,n,o),i.x+=e.xPadding,i.y+=e.yPadding,this.drawTitle(i,e,t,o),this.drawBody(i,e,t,o),this.drawFooter(i,e,t,o))}},handleEvent:function(t){var e=this,n=e._options,i=!1;if(e._lastActive=e._lastActive||[],"mouseout"===t.type?e._active=[]:e._active=e._chart.getElementsAtEventForMode(t,n.mode,n),!(i=!l.arrayEquals(e._active,e._lastActive)))return!1;if(e._lastActive=e._active,n.enabled||n.custom){e._eventPosition={x:t.x,y:t.y};var o=e._model;e.update(!0),e.pivot(),i|=o.x!==e._model.x||o.y!==e._model.y}return i}}),t.Tooltip.positioners={average:function(t){if(!t.length)return!1;var e,n,i=0,o=0,a=0;for(e=0,n=t.length;e<n;++e){var r=t[e];if(r&&r.hasValue()){var s=r.tooltipPosition();i+=s.x,o+=s.y,++a}}return{x:Math.round(i/a),y:Math.round(o/a)}},nearest:function(t,e){var n,i,o,a=e.x,r=e.y,s=Number.POSITIVE_INFINITY;for(i=0,o=t.length;i<o;++i){var c=t[i];if(c&&c.hasValue()){var u=c.getCenterPoint(),d=l.distanceBetweenPoints(e,u);d<s&&(s=d,n=c)}}if(n){var h=n.tooltipPosition();a=h.x,r=h.y}return{x:a,y:r}}}}},{}],35:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n=t.defaults.global;n.elements.arc={backgroundColor:n.defaultColor,borderColor:"#fff",borderWidth:2},t.elements.Arc=t.Element.extend({inLabelRange:function(t){var e=this._view;return!!e&&Math.pow(t-e.x,2)<Math.pow(e.radius+e.hoverRadius,2)},inRange:function(t,n){var i=this._view;if(i){for(var o=e.getAngleFromPoint(i,{x:t,y:n}),a=o.angle,r=o.distance,s=i.startAngle,l=i.endAngle;l<s;)l+=2*Math.PI;for(;a>l;)a-=2*Math.PI;for(;a<s;)a+=2*Math.PI;var c=a>=s&&a<=l,u=r>=i.innerRadius&&r<=i.outerRadius;return c&&u}return!1},getCenterPoint:function(){var t=this._view,e=(t.startAngle+t.endAngle)/2,n=(t.innerRadius+t.outerRadius)/2;return{x:t.x+Math.cos(e)*n,y:t.y+Math.sin(e)*n}},getArea:function(){var t=this._view;return Math.PI*((t.endAngle-t.startAngle)/(2*Math.PI))*(Math.pow(t.outerRadius,2)-Math.pow(t.innerRadius,2))},tooltipPosition:function(){var t=this._view,e=t.startAngle+(t.endAngle-t.startAngle)/2,n=(t.outerRadius-t.innerRadius)/2+t.innerRadius;return{x:t.x+Math.cos(e)*n,y:t.y+Math.sin(e)*n}},draw:function(){var t=this._chart.ctx,e=this._view,n=e.startAngle,i=e.endAngle;t.beginPath(),t.arc(e.x,e.y,e.outerRadius,n,i),t.arc(e.x,e.y,e.innerRadius,i,n,!0),t.closePath(),t.strokeStyle=e.borderColor,t.lineWidth=e.borderWidth,t.fillStyle=e.backgroundColor,t.fill(),t.lineJoin="bevel",e.borderWidth&&t.stroke()}})}},{}],36:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n=t.defaults.global;t.defaults.global.elements.line={tension:.4,backgroundColor:n.defaultColor,borderWidth:3,borderColor:n.defaultColor,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",capBezierPoints:!0,fill:!0},t.elements.Line=t.Element.extend({draw:function(){var t,i,o,a,r=this,s=r._view,l=r._chart.ctx,c=s.spanGaps,u=r._children.slice(),d=n.elements.line,h=-1;for(r._loop&&u.length&&u.push(u[0]),l.save(),l.lineCap=s.borderCapStyle||d.borderCapStyle,l.setLineDash&&l.setLineDash(s.borderDash||d.borderDash),l.lineDashOffset=s.borderDashOffset||d.borderDashOffset,l.lineJoin=s.borderJoinStyle||d.borderJoinStyle,l.lineWidth=s.borderWidth||d.borderWidth,l.strokeStyle=s.borderColor||n.defaultColor,l.beginPath(),h=-1,t=0;t<u.length;++t)i=u[t],o=e.previousItem(u,t),a=i._view,0===t?a.skip||(l.moveTo(a.x,a.y),h=t):(o=h===-1?o:u[h],a.skip||(h!==t-1&&!c||h===-1?l.moveTo(a.x,a.y):e.canvas.lineTo(l,o._view,i._view),h=t));l.stroke(),l.restore()}})}},{}],37:[function(t,e,n){"use strict";e.exports=function(t){function e(t){var e=this._view;return!!e&&Math.pow(t-e.x,2)<Math.pow(e.radius+e.hitRadius,2)}function n(t){var e=this._view;return!!e&&Math.pow(t-e.y,2)<Math.pow(e.radius+e.hitRadius,2)}var i=t.helpers,o=t.defaults.global,a=o.defaultColor;o.elements.point={radius:3,pointStyle:"circle",backgroundColor:a,borderWidth:1,borderColor:a,hitRadius:1,hoverRadius:4,hoverBorderWidth:1},t.elements.Point=t.Element.extend({inRange:function(t,e){var n=this._view;return!!n&&Math.pow(t-n.x,2)+Math.pow(e-n.y,2)<Math.pow(n.hitRadius+n.radius,2)},inLabelRange:e,inXRange:e,inYRange:n,getCenterPoint:function(){var t=this._view;return{x:t.x,y:t.y}},getArea:function(){return Math.PI*Math.pow(this._view.radius,2)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y,padding:t.radius+t.borderWidth}},draw:function(e){var n=this._view,r=this._model,s=this._chart.ctx,l=n.pointStyle,c=n.radius,u=n.x,d=n.y,h=t.helpers.color,p=0;n.skip||(s.strokeStyle=n.borderColor||a,s.lineWidth=i.getValueOrDefault(n.borderWidth,o.elements.point.borderWidth),s.fillStyle=n.backgroundColor||a,void 0!==e&&(r.x<e.left||1.01*e.right<r.x||r.y<e.top||1.01*e.bottom<r.y)&&(r.x<e.left?p=(u-r.x)/(e.left-r.x):1.01*e.right<r.x?p=(r.x-u)/(r.x-e.right):r.y<e.top?p=(d-r.y)/(e.top-r.y):1.01*e.bottom<r.y&&(p=(r.y-d)/(r.y-e.bottom)),p=Math.round(100*p)/100,s.strokeStyle=h(s.strokeStyle).alpha(p).rgbString(),s.fillStyle=h(s.fillStyle).alpha(p).rgbString()),t.canvasHelpers.drawPoint(s,l,c,u,d))}})}},{}],38:[function(t,e,n){"use strict";e.exports=function(t){function e(t){return void 0!==t._view.width}function n(t){var n,i,o,a,r=t._view;if(e(t)){var s=r.width/2;n=r.x-s,i=r.x+s,o=Math.min(r.y,r.base),a=Math.max(r.y,r.base)}else{var l=r.height/2;n=Math.min(r.x,r.base),i=Math.max(r.x,r.base),o=r.y-l,a=r.y+l}return{left:n,top:o,right:i,bottom:a}}var i=t.defaults.global;i.elements.rectangle={backgroundColor:i.defaultColor,borderWidth:0,borderColor:i.defaultColor,borderSkipped:"bottom"},t.elements.Rectangle=t.Element.extend({draw:function(){function t(t){return v[(b+t)%4]}var e,n,i,o,a,r,s,l=this._chart.ctx,c=this._view,u=c.borderWidth;if(c.horizontal?(e=c.base,n=c.x,i=c.y-c.height/2,o=c.y+c.height/2,a=n>e?1:-1,r=1,s=c.borderSkipped||"left"):(e=c.x-c.width/2,n=c.x+c.width/2,i=c.y,o=c.base,a=1,r=o>i?1:-1,s=c.borderSkipped||"bottom"),u){var d=Math.min(Math.abs(e-n),Math.abs(i-o));u=u>d?d:u;var h=u/2,p=e+("left"!==s?h*a:0),f=n+("right"!==s?-h*a:0),m=i+("top"!==s?h*r:0),g=o+("bottom"!==s?-h*r:0);p!==f&&(i=m,o=g),m!==g&&(e=p,n=f)}l.beginPath(),l.fillStyle=c.backgroundColor,l.strokeStyle=c.borderColor,l.lineWidth=u;var v=[[e,o],[e,i],[n,i],[n,o]],y=["bottom","left","top","right"],b=y.indexOf(s,0);b===-1&&(b=0);var x=t(0);l.moveTo(x[0],x[1]);for(var w=1;w<4;w++)x=t(w),l.lineTo(x[0],x[1]);l.fill(),u&&l.stroke()},height:function(){var t=this._view;return t.base-t.y},inRange:function(t,e){var i=!1;if(this._view){var o=n(this);i=t>=o.left&&t<=o.right&&e>=o.top&&e<=o.bottom}return i},inLabelRange:function(t,i){var o=this;if(!o._view)return!1;var a=n(o);return e(o)?t>=a.left&&t<=a.right:i>=a.top&&i<=a.bottom},inXRange:function(t){var e=n(this);return t>=e.left&&t<=e.right},inYRange:function(t){var e=n(this);return t>=e.top&&t<=e.bottom},getCenterPoint:function(){var t,n,i=this._view;return e(this)?(t=i.x,n=(i.y+i.base)/2):(t=(i.x+i.base)/2,n=i.y),{x:t,y:n}},getArea:function(){var t=this._view;return t.width*Math.abs(t.y-t.base)},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y}}})}},{}],39:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){var n=l.getStyle(t,e),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?Number(i[1]):void 0}function n(t,n){var i=t.style,o=t.getAttribute("height"),a=t.getAttribute("width");if(t._chartjs={initial:{height:o,width:a,style:{display:i.display,height:i.height,width:i.width}}},i.display=i.display||"block",null===a||""===a){var r=e(t,"width");void 0!==r&&(t.width=r)}if(null===o||""===o)if(""===t.style.height)t.height=t.width/(n.options.aspectRatio||2);else{var s=e(t,"height");void 0!==r&&(t.height=s)}return t}function i(t,e,n,i,o){return{type:t,chart:e,native:o||null,x:void 0!==n?n:null,y:void 0!==i?i:null}}function o(t,e){var n=c[t.type]||t.type,o=l.getRelativePosition(t,e);return i(n,e,o.x,o.y,t)}function a(t){var e=document.createElement("iframe");return e.className="chartjs-hidden-iframe",e.style.cssText="display:block;overflow:hidden;border:0;margin:0;top:0;left:0;bottom:0;right:0;height:100%;width:100%;position:absolute;pointer-events:none;z-index:-1;",e.tabIndex=-1,l.addEvent(e,"load",function(){l.addEvent(e.contentWindow||e,"resize",t),t()}),e}function r(t,e,n){var o=t._chartjs={ticking:!1},r=function(){o.ticking||(o.ticking=!0,l.requestAnimFrame.call(window,function(){if(o.resizer)return o.ticking=!1,e(i("resize",n))}))};o.resizer=a(r),t.insertBefore(o.resizer,t.firstChild)}function s(t){if(t&&t._chartjs){var e=t._chartjs.resizer;e&&(e.parentNode.removeChild(e),t._chartjs.resizer=null),delete t._chartjs}}var l=t.helpers,c={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"};return{acquireContext:function(t,e){"string"==typeof t?t=document.getElementById(t):t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas);var i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(n(t,e),i):null},releaseContext:function(t){var e=t.canvas;if(e._chartjs){var n=e._chartjs.initial;["height","width"].forEach(function(t){var i=n[t];void 0===i||null===i?e.removeAttribute(t):e.setAttribute(t,i)}),l.each(n.style||{},function(t,n){e.style[n]=t}),e.width=e.width,delete e._chartjs}},addEventListener:function(t,e,n){var i=t.canvas;if("resize"===e)return void r(i.parentNode,n,t);var a=n._chartjs||(n._chartjs={}),s=a.proxies||(a.proxies={}),c=s[t.id+"_"+e]=function(e){n(o(e,t))};l.addEvent(i,e,c)},removeEventListener:function(t,e,n){var i=t.canvas;if("resize"===e)return void s(i.parentNode);var o=n._chartjs||{},a=o.proxies||{},r=a[t.id+"_"+e];r&&l.removeEvent(i,e,r)}}}},{}],40:[function(t,e,n){"use strict";var i=t(39);e.exports=function(t){t.platform={acquireContext:function(){},releaseContext:function(){},addEventListener:function(){},removeEventListener:function(){}},t.helpers.extend(t.platform,i(t))}},{39:39}],41:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e,n){var i,o=t._model||{},a=o.fill;if(void 0===a&&(a=!!o.backgroundColor),a===!1||null===a)return!1;if(a===!0)return"origin";if(i=parseFloat(a,10),isFinite(i)&&Math.floor(i)===i)return"-"!==a[0]&&"+"!==a[0]||(i=e+i),!(i===e||i<0||i>=n)&&i;switch(a){case"bottom":return"start";case"top":return"end";case"zero":return"origin";case"origin":case"start":case"end":return a;default:return!1}}function n(t){var e,n=t.el._model||{},i=t.el._scale||{},o=t.fill,a=null;if(isFinite(o))return null;if("start"===o?a=void 0===n.scaleBottom?i.bottom:n.scaleBottom:"end"===o?a=void 0===n.scaleTop?i.top:n.scaleTop:void 0!==n.scaleZero?a=n.scaleZero:i.getBasePosition?a=i.getBasePosition():i.getBasePixel&&(a=i.getBasePixel()),void 0!==a&&null!==a){if(void 0!==a.x&&void 0!==a.y)return a;if("number"==typeof a&&isFinite(a))return e=i.isHorizontal(),{x:e?a:null,y:e?null:a}}return null}function i(t,e,n){var i,o=t[e],a=o.fill,r=[e];if(!n)return a;for(;a!==!1&&r.indexOf(a)===-1;){if(!isFinite(a))return a;if(!(i=t[a]))return!1;if(i.visible)return a;r.push(a),a=i.fill}return!1}function o(t){var e=t.fill,n="dataset";return e===!1?null:(isFinite(e)||(n="boundary"),u[n](t))}function a(t){return t&&!t.skip}function r(t,e,n,i,o){var a;if(i&&o){for(t.moveTo(e[0].x,e[0].y),a=1;a<i;++a)c.canvas.lineTo(t,e[a-1],e[a]);for(t.lineTo(n[o-1].x,n[o-1].y),a=o-1;a>0;--a)c.canvas.lineTo(t,n[a],n[a-1],!0)}}function s(t,e,n,i,o,s){var l,c,u,d,h,p,f,m=e.length,g=i.spanGaps,v=[],y=[],b=0,x=0;for(t.beginPath(),l=0,c=m+!!s;l<c;++l)u=l%m,d=e[u]._view,h=n(d,u,i),p=a(d),f=a(h),p&&f?(b=v.push(d),x=y.push(h)):b&&x&&(g?(p&&v.push(d),f&&y.push(h)):(r(t,v,y,b,x),b=x=0,v=[],y=[]));r(t,v,y,b,x),t.closePath(),t.fillStyle=o,t.fill()}t.defaults.global.plugins.filler={propagate:!0};var l=t.defaults,c=t.helpers,u={dataset:function(t){
var e=t.fill,n=t.chart,i=n.getDatasetMeta(e),o=i&&n.isDatasetVisible(e),a=o&&i.dataset._children||[];return a.length?function(t,e){return a[e]._view||null}:null},boundary:function(t){var e=t.boundary,n=e?e.x:null,i=e?e.y:null;return function(t){return{x:null===n?t.x:n,y:null===i?t.y:i}}}};return{id:"filler",afterDatasetsUpdate:function(a,r){var s,l,c,u,d=(a.data.datasets||[]).length,h=r.propagate,p=[];for(l=0;l<d;++l)s=a.getDatasetMeta(l),c=s.dataset,u=null,c&&c._model&&c instanceof t.elements.Line&&(u={visible:a.isDatasetVisible(l),fill:e(c,l,d),chart:a,el:c}),s.$filler=u,p.push(u);for(l=0;l<d;++l)(u=p[l])&&(u.fill=i(p,l,h),u.boundary=n(u),u.mapper=o(u))},beforeDatasetDraw:function(t,e){var n=e.meta.$filler;if(n){var i=n.el,o=i._view,a=i._children||[],r=n.mapper,c=o.backgroundColor||l.global.defaultColor;r&&c&&a.length&&s(t.ctx,a,r,o,c,i._loop)}}}}},{}],42:[function(t,e,n){"use strict";e.exports=function(t){function e(t,e){return t.usePointStyle?e*Math.SQRT2:t.boxWidth}function n(e,n){var i=new t.Legend({ctx:e.ctx,options:n,chart:e});o.configure(e,i,n),o.addBox(e,i),e.legend=i}var i=t.helpers,o=t.layoutService,a=i.noop;return t.defaults.global.legend={display:!0,position:"top",fullWidth:!0,reverse:!1,weight:1e3,onClick:function(t,e){var n=e.datasetIndex,i=this.chart,o=i.getDatasetMeta(n);o.hidden=null===o.hidden?!i.data.datasets[n].hidden:null,i.update()},onHover:null,labels:{boxWidth:40,padding:10,generateLabels:function(t){var e=t.data;return i.isArray(e.datasets)?e.datasets.map(function(e,n){return{text:e.label,fillStyle:i.isArray(e.backgroundColor)?e.backgroundColor[0]:e.backgroundColor,hidden:!t.isDatasetVisible(n),lineCap:e.borderCapStyle,lineDash:e.borderDash,lineDashOffset:e.borderDashOffset,lineJoin:e.borderJoinStyle,lineWidth:e.borderWidth,strokeStyle:e.borderColor,pointStyle:e.pointStyle,datasetIndex:n}},this):[]}}},t.Legend=t.Element.extend({initialize:function(t){i.extend(this,t),this.legendHitBoxes=[],this.doughnutMode=!1},beforeUpdate:a,update:function(t,e,n){var i=this;return i.beforeUpdate(),i.maxWidth=t,i.maxHeight=e,i.margins=n,i.beforeSetDimensions(),i.setDimensions(),i.afterSetDimensions(),i.beforeBuildLabels(),i.buildLabels(),i.afterBuildLabels(),i.beforeFit(),i.fit(),i.afterFit(),i.afterUpdate(),i.minSize},afterUpdate:a,beforeSetDimensions:a,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:a,beforeBuildLabels:a,buildLabels:function(){var t=this,e=t.options.labels,n=e.generateLabels.call(t,t.chart);e.filter&&(n=n.filter(function(n){return e.filter(n,t.chart.data)})),t.options.reverse&&n.reverse(),t.legendItems=n},afterBuildLabels:a,beforeFit:a,fit:function(){var n=this,o=n.options,a=o.labels,r=o.display,s=n.ctx,l=t.defaults.global,c=i.getValueOrDefault,u=c(a.fontSize,l.defaultFontSize),d=c(a.fontStyle,l.defaultFontStyle),h=c(a.fontFamily,l.defaultFontFamily),p=i.fontString(u,d,h),f=n.legendHitBoxes=[],m=n.minSize,g=n.isHorizontal();if(g?(m.width=n.maxWidth,m.height=r?10:0):(m.width=r?10:0,m.height=n.maxHeight),r)if(s.font=p,g){var v=n.lineWidths=[0],y=n.legendItems.length?u+a.padding:0;s.textAlign="left",s.textBaseline="top",i.each(n.legendItems,function(t,i){var o=e(a,u),r=o+u/2+s.measureText(t.text).width;v[v.length-1]+r+a.padding>=n.width&&(y+=u+a.padding,v[v.length]=n.left),f[i]={left:0,top:0,width:r,height:u},v[v.length-1]+=r+a.padding}),m.height+=y}else{var b=a.padding,x=n.columnWidths=[],w=a.padding,k=0,C=0,S=u+b;i.each(n.legendItems,function(t,n){var i=e(a,u),o=i+u/2+s.measureText(t.text).width;C+S>m.height&&(w+=k+a.padding,x.push(k),k=0,C=0),k=Math.max(k,o),C+=S,f[n]={left:0,top:0,width:o,height:u}}),w+=k,x.push(k),m.width+=w}n.width=m.width,n.height=m.height},afterFit:a,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){var n=this,o=n.options,a=o.labels,r=t.defaults.global,s=r.elements.line,l=n.width,c=n.lineWidths;if(o.display){var u,d=n.ctx,h=i.getValueOrDefault,p=h(a.fontColor,r.defaultFontColor),f=h(a.fontSize,r.defaultFontSize),m=h(a.fontStyle,r.defaultFontStyle),g=h(a.fontFamily,r.defaultFontFamily),v=i.fontString(f,m,g);d.textAlign="left",d.textBaseline="top",d.lineWidth=.5,d.strokeStyle=p,d.fillStyle=p,d.font=v;var y=e(a,f),b=n.legendHitBoxes,x=function(e,n,i){if(!(isNaN(y)||y<=0)){d.save(),d.fillStyle=h(i.fillStyle,r.defaultColor),d.lineCap=h(i.lineCap,s.borderCapStyle),d.lineDashOffset=h(i.lineDashOffset,s.borderDashOffset),d.lineJoin=h(i.lineJoin,s.borderJoinStyle),d.lineWidth=h(i.lineWidth,s.borderWidth),d.strokeStyle=h(i.strokeStyle,r.defaultColor);var a=0===h(i.lineWidth,s.borderWidth);if(d.setLineDash&&d.setLineDash(h(i.lineDash,s.borderDash)),o.labels&&o.labels.usePointStyle){var l=f*Math.SQRT2/2,c=l/Math.SQRT2,u=e+c,p=n+c;t.canvasHelpers.drawPoint(d,i.pointStyle,l,u,p)}else a||d.strokeRect(e,n,y,f),d.fillRect(e,n,y,f);d.restore()}},w=function(t,e,n,i){d.fillText(n.text,y+f/2+t,e),n.hidden&&(d.beginPath(),d.lineWidth=2,d.moveTo(y+f/2+t,e+f/2),d.lineTo(y+f/2+t+i,e+f/2),d.stroke())},k=n.isHorizontal();u=k?{x:n.left+(l-c[0])/2,y:n.top+a.padding,line:0}:{x:n.left+a.padding,y:n.top+a.padding,line:0};var C=f+a.padding;i.each(n.legendItems,function(t,e){var i=d.measureText(t.text).width,o=y+f/2+i,r=u.x,s=u.y;k?r+o>=l&&(s=u.y+=C,u.line++,r=u.x=n.left+(l-c[u.line])/2):s+C>n.bottom&&(r=u.x=r+n.columnWidths[u.line]+a.padding,s=u.y=n.top+a.padding,u.line++),x(r,s,t),b[e].left=r,b[e].top=s,w(r,s,t,i),k?u.x+=o+a.padding:u.y+=C})}},handleEvent:function(t){var e=this,n=e.options,i="mouseup"===t.type?"click":t.type,o=!1;if("mousemove"===i){if(!n.onHover)return}else{if("click"!==i)return;if(!n.onClick)return}var a=t.x,r=t.y;if(a>=e.left&&a<=e.right&&r>=e.top&&r<=e.bottom)for(var s=e.legendHitBoxes,l=0;l<s.length;++l){var c=s[l];if(a>=c.left&&a<=c.left+c.width&&r>=c.top&&r<=c.top+c.height){if("click"===i){n.onClick.call(e,t.native,e.legendItems[l]),o=!0;break}if("mousemove"===i){n.onHover.call(e,t.native,e.legendItems[l]),o=!0;break}}}return o}}),{id:"legend",beforeInit:function(t){var e=t.options.legend;e&&n(t,e)},beforeUpdate:function(e){var a=e.options.legend,r=e.legend;a?(a=i.configMerge(t.defaults.global.legend,a),r?(o.configure(e,r,a),r.options=a):n(e,a)):r&&(o.removeBox(e,r),delete e.legend)},afterEvent:function(t,e){var n=t.legend;n&&n.handleEvent(e)}}}},{}],43:[function(t,e,n){"use strict";e.exports=function(t){function e(e,n){var o=new t.Title({ctx:e.ctx,options:n,chart:e});i.configure(e,o,n),i.addBox(e,o),e.titleBlock=o}var n=t.helpers,i=t.layoutService,o=n.noop;return t.defaults.global.title={display:!1,position:"top",fullWidth:!0,weight:2e3,fontStyle:"bold",padding:10,text:""},t.Title=t.Element.extend({initialize:function(t){var e=this;n.extend(e,t),e.legendHitBoxes=[]},beforeUpdate:o,update:function(t,e,n){var i=this;return i.beforeUpdate(),i.maxWidth=t,i.maxHeight=e,i.margins=n,i.beforeSetDimensions(),i.setDimensions(),i.afterSetDimensions(),i.beforeBuildLabels(),i.buildLabels(),i.afterBuildLabels(),i.beforeFit(),i.fit(),i.afterFit(),i.afterUpdate(),i.minSize},afterUpdate:o,beforeSetDimensions:o,setDimensions:function(){var t=this;t.isHorizontal()?(t.width=t.maxWidth,t.left=0,t.right=t.width):(t.height=t.maxHeight,t.top=0,t.bottom=t.height),t.paddingLeft=0,t.paddingTop=0,t.paddingRight=0,t.paddingBottom=0,t.minSize={width:0,height:0}},afterSetDimensions:o,beforeBuildLabels:o,buildLabels:o,afterBuildLabels:o,beforeFit:o,fit:function(){var e=this,i=n.getValueOrDefault,o=e.options,a=t.defaults.global,r=o.display,s=i(o.fontSize,a.defaultFontSize),l=e.minSize;e.isHorizontal()?(l.width=e.maxWidth,l.height=r?s+2*o.padding:0):(l.width=r?s+2*o.padding:0,l.height=e.maxHeight),e.width=l.width,e.height=l.height},afterFit:o,isHorizontal:function(){var t=this.options.position;return"top"===t||"bottom"===t},draw:function(){var e=this,i=e.ctx,o=n.getValueOrDefault,a=e.options,r=t.defaults.global;if(a.display){var s,l,c,u=o(a.fontSize,r.defaultFontSize),d=o(a.fontStyle,r.defaultFontStyle),h=o(a.fontFamily,r.defaultFontFamily),p=n.fontString(u,d,h),f=0,m=e.top,g=e.left,v=e.bottom,y=e.right;i.fillStyle=o(a.fontColor,r.defaultFontColor),i.font=p,e.isHorizontal()?(s=g+(y-g)/2,l=m+(v-m)/2,c=y-g):(s="left"===a.position?g+u/2:y-u/2,l=m+(v-m)/2,c=v-m,f=Math.PI*("left"===a.position?-.5:.5)),i.save(),i.translate(s,l),i.rotate(f),i.textAlign="center",i.textBaseline="middle",i.fillText(a.text,0,0,c),i.restore()}}}),{id:"title",beforeInit:function(t){var n=t.options.title;n&&e(t,n)},beforeUpdate:function(o){var a=o.options.title,r=o.titleBlock;a?(a=n.configMerge(t.defaults.global.title,a),r?(i.configure(o,r,a),r.options=a):e(o,a)):r&&(t.layoutService.removeBox(o,r),delete o.titleBlock)}}}},{}],44:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n={position:"bottom"},i=t.Scale.extend({getLabels:function(){var t=this.chart.data;return(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels},determineDataLimits:function(){var t=this,n=t.getLabels();t.minIndex=0,t.maxIndex=n.length-1;var i;void 0!==t.options.ticks.min&&(i=e.indexOf(n,t.options.ticks.min),t.minIndex=i!==-1?i:t.minIndex),void 0!==t.options.ticks.max&&(i=e.indexOf(n,t.options.ticks.max),t.maxIndex=i!==-1?i:t.maxIndex),t.min=n[t.minIndex],t.max=n[t.maxIndex]},buildTicks:function(){var t=this,e=t.getLabels();t.ticks=0===t.minIndex&&t.maxIndex===e.length-1?e:e.slice(t.minIndex,t.maxIndex+1)},getLabelForIndex:function(t,e){var n=this,i=n.chart.data,o=n.isHorizontal();return i.yLabels&&!o?n.getRightValue(i.datasets[e].data[t]):n.ticks[t-n.minIndex]},getPixelForValue:function(t,e,n,i){var o,a=this,r=Math.max(a.maxIndex+1-a.minIndex-(a.options.gridLines.offsetGridLines?0:1),1);if(void 0!==t&&null!==t&&(o=a.isHorizontal()?t.x:t.y),void 0!==o||void 0!==t&&isNaN(e)){var s=a.getLabels();t=o||t;var l=s.indexOf(t);e=l!==-1?l:e}if(a.isHorizontal()){var c=a.width/r,u=c*(e-a.minIndex);return(a.options.gridLines.offsetGridLines&&i||a.maxIndex===a.minIndex&&i)&&(u+=c/2),a.left+Math.round(u)}var d=a.height/r,h=d*(e-a.minIndex);return a.options.gridLines.offsetGridLines&&i&&(h+=d/2),a.top+Math.round(h)},getPixelForTick:function(t,e){return this.getPixelForValue(this.ticks[t],t+this.minIndex,null,e)},getValueForPixel:function(t){var e=this,n=Math.max(e.ticks.length-(e.options.gridLines.offsetGridLines?0:1),1),i=e.isHorizontal(),o=(i?e.width:e.height)/n;return t-=i?e.left:e.top,e.options.gridLines.offsetGridLines&&(t-=o/2),t<=0?0:Math.round(t/o)},getBasePixel:function(){return this.bottom}});t.scaleService.registerScaleType("category",i,n)}},{}],45:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n={position:"left",ticks:{callback:t.Ticks.formatters.linear}},i=t.LinearScaleBase.extend({determineDataLimits:function(){function t(t){return s?t.xAxisID===n.id:t.yAxisID===n.id}var n=this,i=n.options,o=n.chart,a=o.data,r=a.datasets,s=n.isHorizontal();n.min=null,n.max=null;var l=i.stacked;if(void 0===l&&e.each(r,function(e,n){if(!l){var i=o.getDatasetMeta(n);o.isDatasetVisible(n)&&t(i)&&void 0!==i.stack&&(l=!0)}}),i.stacked||l){var c={};e.each(r,function(a,r){var s=o.getDatasetMeta(r),l=[s.type,void 0===i.stacked&&void 0===s.stack?r:"",s.stack].join(".");void 0===c[l]&&(c[l]={positiveValues:[],negativeValues:[]});var u=c[l].positiveValues,d=c[l].negativeValues;o.isDatasetVisible(r)&&t(s)&&e.each(a.data,function(t,e){var o=+n.getRightValue(t);isNaN(o)||s.data[e].hidden||(u[e]=u[e]||0,d[e]=d[e]||0,i.relativePoints?u[e]=100:o<0?d[e]+=o:u[e]+=o)})}),e.each(c,function(t){var i=t.positiveValues.concat(t.negativeValues),o=e.min(i),a=e.max(i);n.min=null===n.min?o:Math.min(n.min,o),n.max=null===n.max?a:Math.max(n.max,a)})}else e.each(r,function(i,a){var r=o.getDatasetMeta(a);o.isDatasetVisible(a)&&t(r)&&e.each(i.data,function(t,e){var i=+n.getRightValue(t);isNaN(i)||r.data[e].hidden||(null===n.min?n.min=i:i<n.min&&(n.min=i),null===n.max?n.max=i:i>n.max&&(n.max=i))})});n.min=isFinite(n.min)?n.min:0,n.max=isFinite(n.max)?n.max:1,this.handleTickRangeOptions()},getTickLimit:function(){var n,i=this,o=i.options.ticks;if(i.isHorizontal())n=Math.min(o.maxTicksLimit?o.maxTicksLimit:11,Math.ceil(i.width/50));else{var a=e.getValueOrDefault(o.fontSize,t.defaults.global.defaultFontSize);n=Math.min(o.maxTicksLimit?o.maxTicksLimit:11,Math.ceil(i.height/(2*a)))}return n},handleDirectionalChanges:function(){this.isHorizontal()||this.ticks.reverse()},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForValue:function(t){var e,n=this,i=n.start,o=+n.getRightValue(t),a=n.end-i;return n.isHorizontal()?(e=n.left+n.width/a*(o-i),Math.round(e)):(e=n.bottom-n.height/a*(o-i),Math.round(e))},getValueForPixel:function(t){var e=this,n=e.isHorizontal(),i=n?e.width:e.height,o=(n?t-e.left:e.bottom-t)/i;return e.start+(e.end-e.start)*o},getPixelForTick:function(t){return this.getPixelForValue(this.ticksAsNumbers[t])}});t.scaleService.registerScaleType("linear",i,n)}},{}],46:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n=e.noop;t.LinearScaleBase=t.Scale.extend({handleTickRangeOptions:function(){var t=this,n=t.options,i=n.ticks;if(i.beginAtZero){var o=e.sign(t.min),a=e.sign(t.max);o<0&&a<0?t.max=0:o>0&&a>0&&(t.min=0)}void 0!==i.min?t.min=i.min:void 0!==i.suggestedMin&&(null===t.min?t.min=i.suggestedMin:t.min=Math.min(t.min,i.suggestedMin)),void 0!==i.max?t.max=i.max:void 0!==i.suggestedMax&&(null===t.max?t.max=i.suggestedMax:t.max=Math.max(t.max,i.suggestedMax)),t.min===t.max&&(t.max++,i.beginAtZero||t.min--)},getTickLimit:n,handleDirectionalChanges:n,buildTicks:function(){var n=this,i=n.options,o=i.ticks,a=n.getTickLimit();a=Math.max(2,a);var r={maxTicks:a,min:o.min,max:o.max,stepSize:e.getValueOrDefault(o.fixedStepSize,o.stepSize)},s=n.ticks=t.Ticks.generators.linear(r,n);n.handleDirectionalChanges(),n.max=e.max(s),n.min=e.min(s),o.reverse?(s.reverse(),n.start=n.max,n.end=n.min):(n.start=n.min,n.end=n.max)},convertTicksToLabels:function(){var e=this;e.ticksAsNumbers=e.ticks.slice(),e.zeroLineIndex=e.ticks.indexOf(0),t.Scale.prototype.convertTicksToLabels.call(e)}})}},{}],47:[function(t,e,n){"use strict";e.exports=function(t){var e=t.helpers,n={position:"left",ticks:{callback:t.Ticks.formatters.logarithmic}},i=t.Scale.extend({determineDataLimits:function(){function t(t){return c?t.xAxisID===n.id:t.yAxisID===n.id}var n=this,i=n.options,o=i.ticks,a=n.chart,r=a.data,s=r.datasets,l=e.getValueOrDefault,c=n.isHorizontal();n.min=null,n.max=null,n.minNotZero=null;var u=i.stacked;if(void 0===u&&e.each(s,function(e,n){if(!u){var i=a.getDatasetMeta(n);a.isDatasetVisible(n)&&t(i)&&void 0!==i.stack&&(u=!0)}}),i.stacked||u){var d={};e.each(s,function(o,r){var s=a.getDatasetMeta(r),l=[s.type,void 0===i.stacked&&void 0===s.stack?r:"",s.stack].join(".");a.isDatasetVisible(r)&&t(s)&&(void 0===d[l]&&(d[l]=[]),e.each(o.data,function(t,e){var o=d[l],a=+n.getRightValue(t);isNaN(a)||s.data[e].hidden||(o[e]=o[e]||0,i.relativePoints?o[e]=100:o[e]+=a)}))}),e.each(d,function(t){var i=e.min(t),o=e.max(t);n.min=null===n.min?i:Math.min(n.min,i),n.max=null===n.max?o:Math.max(n.max,o)})}else e.each(s,function(i,o){var r=a.getDatasetMeta(o);a.isDatasetVisible(o)&&t(r)&&e.each(i.data,function(t,e){var i=+n.getRightValue(t);isNaN(i)||r.data[e].hidden||(null===n.min?n.min=i:i<n.min&&(n.min=i),null===n.max?n.max=i:i>n.max&&(n.max=i),0!==i&&(null===n.minNotZero||i<n.minNotZero)&&(n.minNotZero=i))})});n.min=l(o.min,n.min),n.max=l(o.max,n.max),n.min===n.max&&(0!==n.min&&null!==n.min?(n.min=Math.pow(10,Math.floor(e.log10(n.min))-1),n.max=Math.pow(10,Math.floor(e.log10(n.max))+1)):(n.min=1,n.max=10))},buildTicks:function(){var n=this,i=n.options,o=i.ticks,a={min:o.min,max:o.max},r=n.ticks=t.Ticks.generators.logarithmic(a,n);n.isHorizontal()||r.reverse(),n.max=e.max(r),n.min=e.min(r),o.reverse?(r.reverse(),n.start=n.max,n.end=n.min):(n.start=n.min,n.end=n.max)},convertTicksToLabels:function(){this.tickValues=this.ticks.slice(),t.Scale.prototype.convertTicksToLabels.call(this)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForTick:function(t){return this.getPixelForValue(this.tickValues[t])},getPixelForValue:function(t){var n,i,o,a=this,r=a.start,s=+a.getRightValue(t),l=a.options,c=l.ticks;return a.isHorizontal()?(o=e.log10(a.end)-e.log10(r),0===s?i=a.left:(n=a.width,i=a.left+n/o*(e.log10(s)-e.log10(r)))):(n=a.height,0!==r||c.reverse?0===a.end&&c.reverse?(o=e.log10(a.start)-e.log10(a.minNotZero),i=s===a.end?a.top:s===a.minNotZero?a.top+.02*n:a.top+.02*n+.98*n/o*(e.log10(s)-e.log10(a.minNotZero))):0===s?i=c.reverse?a.top:a.bottom:(o=e.log10(a.end)-e.log10(r),n=a.height,i=a.bottom-n/o*(e.log10(s)-e.log10(r))):(o=e.log10(a.end)-e.log10(a.minNotZero),i=s===r?a.bottom:s===a.minNotZero?a.bottom-.02*n:a.bottom-.02*n-.98*n/o*(e.log10(s)-e.log10(a.minNotZero)))),i},getValueForPixel:function(t){var n,i,o=this,a=e.log10(o.end)-e.log10(o.start);return o.isHorizontal()?(i=o.width,n=o.start*Math.pow(10,(t-o.left)*a/i)):(i=o.height,n=Math.pow(10,(o.bottom-t)*a/i)/o.start),n}});t.scaleService.registerScaleType("logarithmic",i,n)}},{}],48:[function(t,e,n){"use strict";e.exports=function(t){function e(t){var e=t.options;return e.angleLines.display||e.pointLabels.display?t.chart.data.labels.length:0}function n(t){var e=t.options.pointLabels,n=p.getValueOrDefault(e.fontSize,f.defaultFontSize),i=p.getValueOrDefault(e.fontStyle,f.defaultFontStyle),o=p.getValueOrDefault(e.fontFamily,f.defaultFontFamily);return{size:n,style:i,family:o,font:p.fontString(n,i,o)}}function i(t,e,n){return p.isArray(n)?{w:p.longestText(t,t.font,n),h:n.length*e+1.5*(n.length-1)*e}:{w:t.measureText(n).width,h:e}}function o(t,e,n,i,o){return t===i||t===o?{start:e-n/2,end:e+n/2}:t<i||t>o?{start:e-n-5,end:e}:{start:e,end:e+n+5}}function a(t){var a,r,s,l=n(t),c=Math.min(t.height/2,t.width/2),u={r:t.width,l:0,t:t.height,b:0},d={};t.ctx.font=l.font,t._pointLabelSizes=[];var h=e(t);for(a=0;a<h;a++){s=t.getPointPosition(a,c),r=i(t.ctx,l.size,t.pointLabels[a]||""),t._pointLabelSizes[a]=r;var f=t.getIndexAngle(a),m=p.toDegrees(f)%360,g=o(m,s.x,r.w,0,180),v=o(m,s.y,r.h,90,270);g.start<u.l&&(u.l=g.start,d.l=f),g.end>u.r&&(u.r=g.end,d.r=f),v.start<u.t&&(u.t=v.start,d.t=f),v.end>u.b&&(u.b=v.end,d.b=f)}t.setReductions(c,u,d)}function r(t){var e=Math.min(t.height/2,t.width/2);t.drawingArea=Math.round(e),t.setCenterPoint(0,0,0,0)}function s(t){return 0===t||180===t?"center":t<180?"left":"right"}function l(t,e,n,i){if(p.isArray(e))for(var o=n.y,a=1.5*i,r=0;r<e.length;++r)t.fillText(e[r],n.x,o),o+=a;else t.fillText(e,n.x,n.y)}function c(t,e,n){90===t||270===t?n.y-=e.h/2:(t>270||t<90)&&(n.y-=e.h)}function u(t){var i=t.ctx,o=p.getValueOrDefault,a=t.options,r=a.angleLines,u=a.pointLabels;i.lineWidth=r.lineWidth,i.strokeStyle=r.color;var d=t.getDistanceFromCenterForValue(a.reverse?t.min:t.max),h=n(t);i.textBaseline="top";for(var m=e(t)-1;m>=0;m--){if(r.display){var g=t.getPointPosition(m,d);i.beginPath(),i.moveTo(t.xCenter,t.yCenter),i.lineTo(g.x,g.y),i.stroke(),i.closePath()}if(u.display){var v=t.getPointPosition(m,d+5),y=o(u.fontColor,f.defaultFontColor);i.font=h.font,i.fillStyle=y;var b=t.getIndexAngle(m),x=p.toDegrees(b);i.textAlign=s(x),c(x,t._pointLabelSizes[m],v),l(i,t.pointLabels[m]||"",v,h.size)}}}function d(t,n,i,o){var a=t.ctx;if(a.strokeStyle=p.getValueAtIndexOrDefault(n.color,o-1),a.lineWidth=p.getValueAtIndexOrDefault(n.lineWidth,o-1),t.options.gridLines.circular)a.beginPath(),a.arc(t.xCenter,t.yCenter,i,0,2*Math.PI),a.closePath(),a.stroke();else{var r=e(t);if(0===r)return;a.beginPath();var s=t.getPointPosition(0,i);a.moveTo(s.x,s.y);for(var l=1;l<r;l++)s=t.getPointPosition(l,i),a.lineTo(s.x,s.y);a.closePath(),a.stroke()}}function h(t){return p.isNumber(t)?t:0}var p=t.helpers,f=t.defaults.global,m={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1},gridLines:{circular:!1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2,callback:t.Ticks.formatters.linear},pointLabels:{display:!0,fontSize:10,callback:function(t){return t}}},g=t.LinearScaleBase.extend({setDimensions:function(){var t=this,e=t.options,n=e.ticks;t.width=t.maxWidth,t.height=t.maxHeight,t.xCenter=Math.round(t.width/2),t.yCenter=Math.round(t.height/2);var i=p.min([t.height,t.width]),o=p.getValueOrDefault(n.fontSize,f.defaultFontSize);t.drawingArea=e.display?i/2-(o/2+n.backdropPaddingY):i/2},determineDataLimits:function(){var t=this,e=t.chart,n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;p.each(e.data.datasets,function(o,a){if(e.isDatasetVisible(a)){var r=e.getDatasetMeta(a);p.each(o.data,function(e,o){var a=+t.getRightValue(e);isNaN(a)||r.data[o].hidden||(n=Math.min(a,n),i=Math.max(a,i))})}}),t.min=n===Number.POSITIVE_INFINITY?0:n,t.max=i===Number.NEGATIVE_INFINITY?0:i,t.handleTickRangeOptions()},getTickLimit:function(){var t=this.options.ticks,e=p.getValueOrDefault(t.fontSize,f.defaultFontSize);return Math.min(t.maxTicksLimit?t.maxTicksLimit:11,Math.ceil(this.drawingArea/(1.5*e)))},convertTicksToLabels:function(){var e=this;t.LinearScaleBase.prototype.convertTicksToLabels.call(e),e.pointLabels=e.chart.data.labels.map(e.options.pointLabels.callback,e)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},fit:function(){this.options.pointLabels.display?a(this):r(this)},setReductions:function(t,e,n){var i=this,o=e.l/Math.sin(n.l),a=Math.max(e.r-i.width,0)/Math.sin(n.r),r=-e.t/Math.cos(n.t),s=-Math.max(e.b-i.height,0)/Math.cos(n.b);o=h(o),a=h(a),r=h(r),s=h(s),i.drawingArea=Math.min(Math.round(t-(o+a)/2),Math.round(t-(r+s)/2)),i.setCenterPoint(o,a,r,s)},setCenterPoint:function(t,e,n,i){var o=this,a=o.width-e-o.drawingArea,r=t+o.drawingArea,s=n+o.drawingArea,l=o.height-i-o.drawingArea;o.xCenter=Math.round((r+a)/2+o.left),o.yCenter=Math.round((s+l)/2+o.top)},getIndexAngle:function(t){return t*(2*Math.PI/e(this))+(this.chart.options&&this.chart.options.startAngle?this.chart.options.startAngle:0)*Math.PI*2/360},getDistanceFromCenterForValue:function(t){var e=this;if(null===t)return 0;var n=e.drawingArea/(e.max-e.min);return e.options.reverse?(e.max-t)*n:(t-e.min)*n},getPointPosition:function(t,e){var n=this,i=n.getIndexAngle(t)-Math.PI/2;return{x:Math.round(Math.cos(i)*e)+n.xCenter,y:Math.round(Math.sin(i)*e)+n.yCenter}},getPointPositionForValue:function(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))},getBasePosition:function(){var t=this,e=t.min,n=t.max;return t.getPointPositionForValue(0,t.beginAtZero?0:e<0&&n<0?n:e>0&&n>0?e:0)},draw:function(){var t=this,e=t.options,n=e.gridLines,i=e.ticks,o=p.getValueOrDefault;if(e.display){var a=t.ctx,r=o(i.fontSize,f.defaultFontSize),s=o(i.fontStyle,f.defaultFontStyle),l=o(i.fontFamily,f.defaultFontFamily),c=p.fontString(r,s,l);p.each(t.ticks,function(s,l){if(l>0||e.reverse){var u=t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]),h=t.yCenter-u;if(n.display&&0!==l&&d(t,n,u,l),i.display){var p=o(i.fontColor,f.defaultFontColor);if(a.font=c,i.showLabelBackdrop){var m=a.measureText(s).width;a.fillStyle=i.backdropColor,a.fillRect(t.xCenter-m/2-i.backdropPaddingX,h-r/2-i.backdropPaddingY,m+2*i.backdropPaddingX,r+2*i.backdropPaddingY)}a.textAlign="center",a.textBaseline="middle",a.fillStyle=p,a.fillText(s,t.xCenter,h)}}}),(e.angleLines.display||e.pointLabels.display)&&u(t)}}});t.scaleService.registerScaleType("radialLinear",g,m)}},{}],49:[function(t,e,n){"use strict";var i=t(1);i="function"==typeof i?i:window.moment,e.exports=function(t){function e(t,e){var n=t.options.time;if("string"==typeof n.parser)return i(e,n.parser);if("function"==typeof n.parser)return n.parser(e);if("function"==typeof e.getMonth||"number"==typeof e)return i(e);if(e.isValid&&e.isValid())return e;var o=n.format;return"string"!=typeof o&&o.call?(console.warn("options.time.format is deprecated and replaced by options.time.parser."),o(e)):i(e,o)}function n(t,e,n,i){for(var o,a=Object.keys(s),r=a.length,l=a.indexOf(t);l<r;l++){o=a[l];var c=s[o],u=c.steps&&c.steps[c.steps.length-1]||c.maxStep;if(void 0===u||Math.ceil((n-e)/(u*c.size))<=i)break}return o}function o(t,e,n,i){var o=s[n],a=o.size,r=Math.ceil((e-t)/a),l=1,c=e-t;if(o.steps)for(var u=o.steps.length,d=0;d<u&&r>i;d++)l=o.steps[d],r=Math.ceil(c/(a*l));else for(;r>i&&i>0;)++l,r=Math.ceil(c/(a*l));return l}function a(t,e,n){var o=[];if(t.maxTicks){var a=t.stepSize;o.push(void 0!==t.min?t.min:n.min);for(var r=i(n.min);r.add(a,t.unit).valueOf()<n.max;)o.push(r.valueOf());var s=t.max||n.max;o[o.length-1]!==s&&o.push(s)}return o}var r=t.helpers,s={millisecond:{size:1,steps:[1,2,5,10,20,50,100,250,500]},second:{size:1e3,steps:[1,2,5,10,30]},minute:{size:6e4,steps:[1,2,5,10,30]},hour:{size:36e5,steps:[1,2,3,6,12]},day:{size:864e5,steps:[1,2,5]},week:{size:6048e5,maxStep:4},month:{size:2628e6,maxStep:3},quarter:{size:7884e6,maxStep:4},year:{size:3154e7,maxStep:!1}},l={position:"bottom",time:{parser:!1,format:!1,unit:!1,round:!1,displayFormat:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm:ss a",hour:"MMM D, hA",day:"ll",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"}},ticks:{autoSkip:!1}};t.Ticks.generators.time=function(t,e){var n,o,r=t.isoWeekday;return"week"===t.unit&&r!==!1?(n=i(e.min).startOf("isoWeek").isoWeekday(r).valueOf(),o=i(e.max).startOf("isoWeek").isoWeekday(r),e.max-o>0&&o.add(1,"week"),o=o.valueOf()):(n=i(e.min).startOf(t.unit).valueOf(),o=i(e.max).startOf(t.unit),e.max-o>0&&o.add(1,t.unit),o=o.valueOf()),a(t,e,{min:n,max:o})};var c=t.Scale.extend({initialize:function(){if(!i)throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");t.Scale.prototype.initialize.call(this)},determineDataLimits:function(){var t,n=this,i=n.options.time,o=Number.MAX_SAFE_INTEGER,a=Number.MIN_SAFE_INTEGER,s=n.chart.data,l={labels:[],datasets:[]};r.each(s.labels,function(r,s){var c=e(n,r);c.isValid()&&(i.round&&c.startOf(i.round),t=c.valueOf(),o=Math.min(t,o),a=Math.max(t,a),l.labels[s]=t)}),r.each(s.datasets,function(s,c){var u=[];"object"==typeof s.data[0]&&null!==s.data[0]&&n.chart.isDatasetVisible(c)?r.each(s.data,function(r,s){var l=e(n,n.getRightValue(r));l.isValid()&&(i.round&&l.startOf(i.round),t=l.valueOf(),o=Math.min(t,o),a=Math.max(t,a),u[s]=t)}):u=l.labels.slice(),l.datasets[c]=u}),n.dataMin=o,n.dataMax=a,n._parsedData=l},buildTicks:function(){var i,a,s=this,l=s.options.time,c=s.dataMin,u=s.dataMax;if(l.min){var d=e(s,l.min);l.round&&d.round(l.round),i=d.valueOf()}l.max&&(a=e(s,l.max).valueOf());var h=s.getLabelCapacity(i||c),p=l.unit||n(l.minUnit,i||c,a||u,h);s.displayFormat=l.displayFormats[p];var f=l.stepSize||o(i||c,a||u,p,h);s.ticks=t.Ticks.generators.time({maxTicks:h,min:i,max:a,stepSize:f,unit:p,isoWeekday:l.isoWeekday},{min:c,max:u}),s.max=r.max(s.ticks),s.min=r.min(s.ticks)},getLabelForIndex:function(t,n){var i=this,o=i.chart.data.labels&&t<i.chart.data.labels.length?i.chart.data.labels[t]:"",a=i.chart.data.datasets[n].data[t];return null!==a&&"object"==typeof a&&(o=i.getRightValue(a)),i.options.time.tooltipFormat&&(o=e(i,o).format(i.options.time.tooltipFormat)),o},tickFormatFunction:function(t,e,n){var i=t.format(this.displayFormat),o=this.options.ticks,a=r.getValueOrDefault(o.callback,o.userCallback);return a?a(i,e,n):i},convertTicksToLabels:function(){var t=this;t.ticksAsTimestamps=t.ticks,t.ticks=t.ticks.map(function(t){return i(t)}).map(t.tickFormatFunction,t)},getPixelForOffset:function(t){var e=this,n=e.max-e.min,i=n?(t-e.min)/n:0;if(e.isHorizontal()){var o=e.width*i;return e.left+Math.round(o)}var a=e.height*i;return e.top+Math.round(a)},getPixelForValue:function(t,n,i){var o=this,a=null;if(void 0!==n&&void 0!==i&&(a=o._parsedData.datasets[i][n]),null===a&&(t&&t.isValid||(t=e(o,o.getRightValue(t))),t&&t.isValid&&t.isValid()&&(a=t.valueOf())),null!==a)return o.getPixelForOffset(a)},getPixelForTick:function(t){return this.getPixelForOffset(this.ticksAsTimestamps[t])},getValueForPixel:function(t){var e=this,n=e.isHorizontal()?e.width:e.height,o=(t-(e.isHorizontal()?e.left:e.top))/n;return i(e.min+o*(e.max-e.min))},getLabelWidth:function(e){var n=this,i=n.options.ticks,o=n.ctx.measureText(e).width,a=Math.cos(r.toRadians(i.maxRotation)),s=Math.sin(r.toRadians(i.maxRotation));return o*a+r.getValueOrDefault(i.fontSize,t.defaults.global.defaultFontSize)*s},getLabelCapacity:function(t){var e=this;e.displayFormat=e.options.time.displayFormats.millisecond;var n=e.tickFormatFunction(i(t),0,[]),o=e.getLabelWidth(n);return(e.isHorizontal()?e.width:e.height)/o}});t.scaleService.registerScaleType("time",c,l)}},{1:1}]},{},[7])(7)});var WOW=function(t){var e=t||{};this._boxClass=e.boxClass||"wow",this._animateClass=e.animateClass||"animated",this._offset=e.offset||0,this._mobile=void 0===e.mobile,this._live=void 0===e.live,this._seoFixEnabled=void 0===e.seoFixEnabled,this._animationDuration=e.animationDuration||"1s",this._animationDelay=e.animationDelay||"0s",this._initStorageVariables()};WOW.prototype._initStorageVariables=function(){this._animation=[],this._boxes=[],this._cleanupBoxListener=[],this._cleanupBoxVisibleListener=[]},WOW.prototype.init=function(){!this._mobile&&this._isMobile()||(this._eachBoxInit(this._prepareBox.bind(this)),this._startWow())},WOW.prototype._isMobile=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},WOW.prototype._eachBoxInit=function(t){for(var e=document.getElementsByClassName(this._boxClass),n=0;n<e.length;n++)!function(n){t(e[n],n)}(n)},WOW.prototype._prepareBox=function(t){var e=this._boxes.push(t)-1;this._animation[e]={animationName:t.style.animationName||window.getComputedStyle(t,null).animationName},t.style.animationName="none",t.style.visibility="hidden"},WOW.prototype._startWow=function(){this._live&&this._checkForChanges(),0===window.scrollY&&this._seoFixEnabled&&this._seoFix(),this._appearInView(),this._scrollHandler()},WOW.prototype._seoFix=function(){this._showNotInView()},WOW.prototype._appear=function(t,e){t.style.animationPlayState||t.style.WebkitAnimationPlayState;t.className.indexOf(this._animateClass)===-1&&(delete this._boxes[e],this._onStartAnimation(t,e),this._onStopAnimation(t,e),this._animate(t,e,this._getAnimationConfig(t)))},WOW.prototype._onStartAnimation=function(t,e){this._cleanupBoxVisibleListener[e]=this._boxVisible.bind(this,t,e),t.addEventListener("animationstart",this._cleanupBoxVisibleListener[e]),t.addEventListener("webkitAnimationStart",this._cleanupBoxVisibleListener[e])},WOW.prototype._onStopAnimation=function(t,e){this._cleanupBoxListener[e]=this._cleanupBox.bind(this,t,e),t.addEventListener("animationend",this._cleanupBoxListener[e]),t.addEventListener("webkitAnimationEnd",this._cleanupBoxListener[e])},WOW.prototype._getAnimationConfig=function(t){return{delay:this._getDelay(t),duration:this._getDuration(t),iterations:this._getIterations(t)}},WOW.prototype._getDelay=function(t){return t.getAttribute("data-wow-delay")||this._animationDelay},WOW.prototype._getDuration=function(t){return t.getAttribute("data-wow-duration")||this._animationDuration},WOW.prototype._getIterations=function(t){return t.getAttribute("data-wow-iteration")||t.style.animationIterationCount||window.getComputedStyle(t,null).animationIterationCount||1},WOW.prototype._animate=function(t,e,n){t.style.animationDelay=n.delay,t.style.animationDuration=n.duration,t.style.animationIterationCount=n.iterations,t.style.animationName=this._animation[e].animationName,t.className+=" "+this._animateClass},WOW.prototype._boxVisible=function(t,e){t.style.visibility="visible",t.removeEventListener("animationstart",this._cleanupBoxVisibleListener[e]),
t.removeEventListener("webkitAnimationStart",this._cleanupBoxVisibleListener[e]),delete this._cleanupBoxVisibleListener[e]},WOW.prototype._cleanupBox=function(t,e){t.style.animationDelay="",t.style.animationDuration="",t.style.animationIterationCount="",t.style.animationName="none",this._cleanupClass(t),t.removeEventListener("animationend",this._cleanupBoxListener[e]),t.removeEventListener("webkitAnimationEnd",this._cleanupBoxListener[e]),delete this._cleanupBoxListener[e]},WOW.prototype._cleanupClass=function(t){var e=t.className.split(" "),n=e.indexOf(this._animateClass);n!==-1&&(e.splice(n,1),t.className=e.join(" "))},WOW.prototype._eachBox=function(t){for(var e=0;e<this._boxes.length;e++){this._boxes[e]&&function(e){t(this._boxes[e],e)}.bind(this)(e)}},WOW.prototype._scrollHandler=function(){this._hideSeoFixListener=this._hideSeoFix.bind(this),window.addEventListener("scroll",this._hideSeoFixListener),window.addEventListener("scroll",this._appearInView.bind(this)),window.addEventListener("resize",this._appearInView.bind(this))},WOW.prototype._hideSeoFix=function(){window.removeEventListener("scroll",this._hideSeoFixListener),delete this._hideSeoFixListener,this._eachBox(function(t,e){this._isInView(t)||(t.style.visibility="hidden")}.bind(this))},WOW.prototype._appearInView=function(){this._eachBox(function(t,e){this._animateBox(t,e)}.bind(this))},WOW.prototype._animateBox=function(t,e){this._isInView(t)&&(delete this._boxes[e],this._appear(t,e))},WOW.prototype._showNotInView=function(){this._eachBox(function(t,e){this._makeVisible(t,e)}.bind(this))},WOW.prototype._makeVisible=function(t,e){this._isInView(t)||(this._boxes[e].style.visibility="visible")},WOW.prototype._isInView=function(t){var e=t.getAttribute("data-wow-offset")||this._offset,n=this._getElementOffset(t),i=n+~~e;return i<=window.innerHeight+window.scrollY&&(0===i?10:i)>=window.scrollY},WOW.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=document.body,i=window.pageYOffset||document.documentElement.scrollTop||n.scrollTop,o=document.documentElement.clientTop||n.clientTop||0,a=e.top+i-o;return Math.round(a)},WOW.prototype._checkForChanges=function(){var t=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,e=new t(this._mutations.bind(this)),n={childList:!0,subtree:!0};e.observe(document.body,n)},WOW.prototype._mutations=function(t){t.forEach(function(t){for(var e=0;e<t.addedNodes.length;e++)this.doSync(t.addedNodes[e])}.bind(this))},WOW.prototype.doSync=function(t){if(t.className){t.className.split(" ").indexOf(this._boxClass)!==-1&&this._prepareBox(t)}};var OFFSET_TOP=50,TRANSITION_DURATION=1500;$(window).scroll(function(){$(".navbar").offset().top>OFFSET_TOP?$(".scrolling-navbar").addClass("top-nav-collapse"):$(".scrolling-navbar").removeClass("top-nav-collapse")}),function(t,e){"use strict";"function"==typeof define&&define.amd?define([],function(){return e.apply(t)}):"object"==typeof exports?module.exports=e.call(t):t.Waves=e.call(t)}("object"==typeof global?global:this,function(){"use strict";function t(t){return null!==t&&t===t.window}function e(e){return t(e)?e:9===e.nodeType&&e.defaultView}function n(t){var e=typeof t;return"function"===e||"object"===e&&!!t}function i(t){return n(t)&&t.nodeType>0}function o(t){var e=h.call(t);return"[object String]"===e?d(t):n(t)&&/^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(e)&&t.hasOwnProperty("length")?t:i(t)?[t]:[]}function a(t){var n,i,o={top:0,left:0},a=t&&t.ownerDocument;return n=a.documentElement,void 0!==t.getBoundingClientRect&&(o=t.getBoundingClientRect()),i=e(a),{top:o.top+i.pageYOffset-n.clientTop,left:o.left+i.pageXOffset-n.clientLeft}}function r(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+=n+":"+t[n]+";");return e}function s(t,e,n){if(n){n.classList.remove("waves-rippling");var i=n.getAttribute("data-x"),o=n.getAttribute("data-y"),a=n.getAttribute("data-scale"),s=n.getAttribute("data-translate"),l=Date.now()-Number(n.getAttribute("data-hold")),c=350-l;c<0&&(c=0),"mousemove"===t.type&&(c=150);var u="mousemove"===t.type?2500:f.duration;setTimeout(function(){var t={top:o+"px",left:i+"px",opacity:"0","-webkit-transition-duration":u+"ms","-moz-transition-duration":u+"ms","-o-transition-duration":u+"ms","transition-duration":u+"ms","-webkit-transform":a+" "+s,"-moz-transform":a+" "+s,"-ms-transform":a+" "+s,"-o-transform":a+" "+s,transform:a+" "+s};n.setAttribute("style",r(t)),setTimeout(function(){try{e.removeChild(n)}catch(t){return!1}},u)},c)}}function l(t){if(g.allowEvent(t)===!1)return null;for(var e=null,n=t.target||t.srcElement;null!==n.parentElement;){if(n.classList.contains("waves-effect")&&!(n instanceof SVGElement)){e=n;break}n=n.parentElement}return e}function c(t){var e=l(t);if(null!==e){if(e.disabled||e.getAttribute("disabled")||e.classList.contains("disabled"))return;if(g.registerEvent(t),"touchstart"===t.type&&f.delay){var n=!1,i=setTimeout(function(){i=null,f.show(t,e)},f.delay),o=function(o){i&&(clearTimeout(i),i=null,f.show(t,e)),n||(n=!0,f.hide(o,e))},a=function(t){i&&(clearTimeout(i),i=null),o(t)};e.addEventListener("touchmove",a,!1),e.addEventListener("touchend",o,!1),e.addEventListener("touchcancel",o,!1)}else f.show(t,e),p&&(e.addEventListener("touchend",f.hide,!1),e.addEventListener("touchcancel",f.hide,!1)),e.addEventListener("mouseup",f.hide,!1),e.addEventListener("mouseleave",f.hide,!1)}}var u=u||{},d=document.querySelectorAll.bind(document),h=Object.prototype.toString,p="ontouchstart"in window,f={duration:750,delay:200,show:function(t,e,n){if(2===t.button)return!1;e=e||this;var i=document.createElement("div");i.className="waves-ripple waves-rippling",e.appendChild(i);var o=a(e),s=0,l=0;"touches"in t&&t.touches.length?(s=t.touches[0].pageY-o.top,l=t.touches[0].pageX-o.left):(s=t.pageY-o.top,l=t.pageX-o.left),l=l>=0?l:0,s=s>=0?s:0;var c="scale("+e.clientWidth/100*3+")",u="translate(0,0)";n&&(u="translate("+n.x+"px, "+n.y+"px)"),i.setAttribute("data-hold",Date.now()),i.setAttribute("data-x",l),i.setAttribute("data-y",s),i.setAttribute("data-scale",c),i.setAttribute("data-translate",u);var d={top:s+"px",left:l+"px"};i.classList.add("waves-notransition"),i.setAttribute("style",r(d)),i.classList.remove("waves-notransition"),d["-webkit-transform"]=c+" "+u,d["-moz-transform"]=c+" "+u,d["-ms-transform"]=c+" "+u,d["-o-transform"]=c+" "+u,d.transform=c+" "+u,d.opacity="1";var h="mousemove"===t.type?2500:f.duration;d["-webkit-transition-duration"]=h+"ms",d["-moz-transition-duration"]=h+"ms",d["-o-transition-duration"]=h+"ms",d["transition-duration"]=h+"ms",i.setAttribute("style",r(d))},hide:function(t,e){e=e||this;for(var n=e.getElementsByClassName("waves-rippling"),i=0,o=n.length;i<o;i++)s(t,e,n[i])}},m={input:function(t){var e=t.parentNode;if("i"!==e.tagName.toLowerCase()||!e.classList.contains("waves-effect")){var n=document.createElement("i");n.className=t.className+" waves-input-wrapper",t.className="waves-button-input",e.replaceChild(n,t),n.appendChild(t);var i=window.getComputedStyle(t,null),o=i.color,a=i.backgroundColor;n.setAttribute("style","color:"+o+";background:"+a),t.setAttribute("style","background-color:rgba(0,0,0,0);")}},img:function(t){var e=t.parentNode;if("i"!==e.tagName.toLowerCase()||!e.classList.contains("waves-effect")){var n=document.createElement("i");e.replaceChild(n,t),n.appendChild(t)}}},g={touches:0,allowEvent:function(t){var e=!0;return/^(mousedown|mousemove)$/.test(t.type)&&g.touches&&(e=!1),e},registerEvent:function(t){var e=t.type;"touchstart"===e?g.touches+=1:/^(touchend|touchcancel)$/.test(e)&&setTimeout(function(){g.touches&&(g.touches-=1)},500)}};return u.init=function(t){var e=document.body;t=t||{},"duration"in t&&(f.duration=t.duration),"delay"in t&&(f.delay=t.delay),p&&(e.addEventListener("touchstart",c,!1),e.addEventListener("touchcancel",g.registerEvent,!1),e.addEventListener("touchend",g.registerEvent,!1)),e.addEventListener("mousedown",c,!1)},u.attach=function(t,e){t=o(t),"[object Array]"===h.call(e)&&(e=e.join(" ")),e=e?" "+e:"";for(var n,i,a=0,r=t.length;a<r;a++)n=t[a],i=n.tagName.toLowerCase(),["input","img"].indexOf(i)!==-1&&(m[i](n),n=n.parentElement),n.className.indexOf("waves-effect")===-1&&(n.className+=" waves-effect"+e)},u.ripple=function(t,e){t=o(t);var n=t.length;if(e=e||{},e.wait=e.wait||0,e.position=e.position||null,n)for(var i,r,s,l={},c=0,u={type:"mousedown",button:1};c<n;c++)if(i=t[c],r=e.position||{x:i.clientWidth/2,y:i.clientHeight/2},s=a(i),l.x=s.left+r.x,l.y=s.top+r.y,u.pageX=l.x,u.pageY=l.y,f.show(u,i),e.wait>=0&&null!==e.wait){var d={type:"mouseup",button:1};setTimeout(function(t,e){return function(){f.hide(t,e)}}(d,i),e.wait)}},u.calm=function(t){t=o(t);for(var e={type:"mouseup",button:1},n=0,i=t.length;n<i;n++)f.hide(e,t[n])},u.displayEffect=function(t){console.error("Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"),u.init(t)},u}),Waves.attach(".btn, .btn-floating",["waves-light"]),Waves.attach(".view .mask",["waves-light"]),Waves.attach(".waves-light",["waves-light"]),Waves.attach(".navbar-nav a, .nav-icons li a, .navbar form, .nav-tabs .nav-item",["waves-light"]),Waves.attach(".navbar-brand",["waves-light"]),Waves.attach(".pager li a",["waves-light"]),Waves.attach(".pagination .page-item .page-link",["waves-effect"]),Waves.init(),function(t){t(document).ready(function(){var e=["text","password","email","url","tel","number","search","search-md"].map(function(t){return"input[type="+t+"]"}).join(", ")+", textarea",n=function(t){var e=t.siblings("label, i"),n=t.val().length,i=t.attr("placeholder");e[(n||i?"add":"remove")+"Class"]("active")},i=function(t){if(t.hasClass("validate")){var e=t.val(),n=!e.length,i=!t[0].validity.badInput;if(n&&i)t.removeClass("valid").removeClass("invalid");else{var o=t.is(":valid"),a=+t.attr("length")||0;o&&(!a||a>e.length)?t.removeClass("invalid").addClass("valid"):t.removeClass("valid").addClass("invalid")}}},o=function(){var e=t(void 0);if(e.val().length){var n=t(".hiddendiv"),i=e.css("font-family"),o=e.css("font-size");o&&hiddenDiv.css("font-size",o),i&&hiddenDiv.css("font-family",i),"off"===e.attr("wrap")&&hiddenDiv.css("overflow-wrap","normal").css("white-space","pre"),n.text(e.val()+"\n");var a=hiddenDiv.html().replace(/\n/g,"<br>");n.html(a),n.css("width",e.is(":visible")?e.width():t(window).width()/2),e.css("height",n.height())}};t(e).each(function(e,i){var o=t(i),a=o.siblings("label, i");n(o),i.validity.badInput&&a.addClass("active")}),t(document).on("focus",e,function(e){t(e.target).siblings("label, i").addClass("active")}),t(document).on("blur",e,function(e){var n=t(e.target),o=!n.val(),a=!e.target.validity.badInput,r=void 0===n.attr("placeholder");o&&a&&r&&n.siblings("label, i").removeClass("active"),i(n)}),t(document).on("change",e,function(e){var o=t(e.target);n(o),i(o)}),t("input[autofocus]").siblings("label, i").addClass("active"),t(document).on("reset",function(n){var i=t(n.target);if(i.is("form")){i.find(e).removeClass("valid").removeClass("invalid").each(function(e,n){var i=t(n),o=!i.val(),a=!i.attr("placeholder");o&&a&&i.siblings("label, i").removeClass("active")}),i.find("select.initialized").each(function(e,n){var i=t(n),o=i.siblings("input.select-dropdown"),a=i.children("[selected]").val();i.val(a),o.val(a)})}}),t(".hiddendiv").first().length||($hiddenDiv=t('<div class="hiddendiv common"></div>'),t("body").append($hiddenDiv)),t(".materialize-textarea").each(o),t("body").on("keyup keydown",".materialize-textarea",o)})}(jQuery),$(document).ready(function(){$("#preloader-markup").load("mdb-addons/preloader.html",function(){$("#mdb-preloader").fadeOut("slow")})}),function(t){t(document).ready(function(){t(document).on("click.card",".card",function(e){var n=t(this);if(n.find(".card-reveal").length){var i=t(e.target),o=i.is(".card-reveal .card-title"),a=(i.is(".card-reveal .card-title i"),i.is(".card .activator")),r=i.is(".card .activator i");o||isTitleIcon?n.find(".card-reveal").velocity({translateY:0},{duration:225,queue:!1,easing:"easeInOutQuad",complete:function(){t(this).css({display:"none"})}}):(a||r)&&n.find(".card-reveal").css({display:"block"}).velocity("stop",!1).velocity({translateY:"-100%"},{duration:300,queue:!1,easing:"easeInOutQuad"})}}),t(".rotate-btn").on("click",function(){console.log("click"),t("#"+t(this).attr("data-card")).toggleClass("flipped")})})}(jQuery),$(document).ready(function(t){t(".card-share > a").on("click",function(e){e.preventDefault(),t(this).parent().find("div").toggleClass("social-reveal-active"),t(this).toggleClass("share-expanded")})}),function(t){function e(){var e=+t(this).attr("length"),n=+t(this).val().length,i=n<=e;t(this).parent().find('span[class="character-counter"]').html(n+"/"+e),o(i,t(this))}function n(e){var n=t("<span/>").addClass("character-counter").css("float","right").css("font-size","12px").css("height",1);e.parent().append(n)}function i(){t(this).parent().find('span[class="character-counter"]').html("")}function o(t,e){var n=e.hasClass("invalid");t&&n?e.removeClass("invalid"):t||n||(e.removeClass("valid"),e.addClass("invalid"))}t.fn.characterCounter=function(){return this.each(function(){void 0!==t(this).attr("length")&&(t(this).on("input",e),t(this).on("focus",e),t(this).on("blur",i),n(t(this)))})},t(document).ready(function(){t("input, textarea").characterCounter()})}(jQuery),function(t){t(["jquery"],function(t){return function(){function e(t,e,n){return f({type:w.error,iconClass:m().iconClasses.error,message:t,optionsOverride:n,title:e})}function n(e,n){return e||(e=m()),v=t("#"+e.containerId),v.length?v:(n&&(v=d(e)),v)}function i(t,e,n){return f({type:w.info,iconClass:m().iconClasses.info,message:t,optionsOverride:n,title:e})}function o(t){y=t}function a(t,e,n){return f({type:w.success,iconClass:m().iconClasses.success,message:t,optionsOverride:n,title:e})}function r(t,e,n){return f({type:w.warning,iconClass:m().iconClasses.warning,message:t,optionsOverride:n,title:e})}function s(t,e){var i=m();v||n(i),u(t,i,e)||c(i)}function l(e){var i=m();if(v||n(i),e&&0===t(":focus",e).length)return void g(e);v.children().length&&v.remove()}function c(e){for(var n=v.children(),i=n.length-1;i>=0;i--)u(t(n[i]),e)}function u(e,n,i){var o=!(!i||!i.force)&&i.force;return!(!e||!o&&0!==t(":focus",e).length)&&(e[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){g(e)}}),!0)}function d(e){return v=t("<div/>").attr("id",e.containerId).addClass(e.positionClass).attr("aria-live","polite").attr("role","alert"),v.appendTo(t(e.target)),v}function h(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:'<button type="button">&times;</button>',newestOnTop:!0,preventDuplicates:!1,progressBar:!1}}function p(t){y&&y(t)}function f(e){function i(){e.iconClass&&k.addClass(f.toastClass).addClass(y)}function o(){f.newestOnTop?v.prepend(k):v.append(k)}function a(){e.title&&(C.append(e.title).addClass(f.titleClass),k.append(C))}function r(){e.message&&(S.append(e.message).addClass(f.messageClass),k.append(S))}function s(){f.closeButton&&(M.addClass("toast-close-button").attr("role","button"),k.prepend(M))}function l(){f.progressBar&&(T.addClass("toast-progress"),k.prepend(T))}function c(e){if(!t(":focus",k).length||e)return clearTimeout(I.intervalId),k[f.hideMethod]({duration:f.hideDuration,easing:f.hideEasing,complete:function(){g(k),f.onHidden&&"hidden"!==A.state&&f.onHidden(),A.state="hidden",A.endTime=new Date,p(A)}})}function u(){(f.timeOut>0||f.extendedTimeOut>0)&&(w=setTimeout(c,f.extendedTimeOut),I.maxHideTime=parseFloat(f.extendedTimeOut),I.hideEta=(new Date).getTime()+I.maxHideTime)}function d(){clearTimeout(w),I.hideEta=0,k.stop(!0,!0)[f.showMethod]({duration:f.showDuration,easing:f.showEasing})}function h(){var t=(I.hideEta-(new Date).getTime())/I.maxHideTime*100;T.width(t+"%")}var f=m(),y=e.iconClass||f.iconClass;if(void 0!==e.optionsOverride&&(f=t.extend(f,e.optionsOverride),y=e.optionsOverride.iconClass||y),!function(t,e){if(t.preventDuplicates){if(e.message===b)return!0;b=e.message}return!1}(f,e)){x++,v=n(f,!0);var w=null,k=t("<div/>"),C=t("<div/>"),S=t("<div/>"),T=t("<div/>"),M=t(f.closeHtml),I={intervalId:null,hideEta:null,maxHideTime:null},A={toastId:x,state:"visible",startTime:new Date,options:f,map:e};return function(){i(),a(),r(),s(),l(),o()}(),function(){k.hide(),k[f.showMethod]({duration:f.showDuration,easing:f.showEasing,complete:f.onShown}),f.timeOut>0&&(w=setTimeout(c,f.timeOut),I.maxHideTime=parseFloat(f.timeOut),I.hideEta=(new Date).getTime()+I.maxHideTime,f.progressBar&&(I.intervalId=setInterval(h,10)))}(),function(){k.hover(d,u),!f.onclick&&f.tapToDismiss&&k.click(c),f.closeButton&&M&&M.click(function(t){t.stopPropagation?t.stopPropagation():void 0!==t.cancelBubble&&t.cancelBubble!==!0&&(t.cancelBubble=!0),c(!0)}),f.onclick&&k.click(function(){f.onclick(),c()})}(),p(A),f.debug&&console&&console.log(A),k}}function m(){return t.extend({},h(),k.options)}function g(t){v||(v=n()),t.is(":visible")||(t.remove(),t=null,0===v.children().length&&(v.remove(),b=void 0))}var v,y,b,x=0,w={error:"error",info:"info",success:"success",warning:"warning"},k={clear:s,remove:l,error:e,getContainer:n,info:i,options:{},subscribe:o,success:a,version:"2.1.1",warning:r};return k}()})}("function"==typeof define&&define.amd?define:function(t,e){"undefined"!=typeof module&&module.exports?module.exports=e(require("jquery")):window.toastr=e(window.jQuery)}),$(".smooth-scroll").on("click","a",function(t){t.preventDefault();var e=$(this).attr("href"),n=$(this).attr("data-offset")?$(this).attr("data-offset"):0;$("body,html").animate({scrollTop:$(e).offset().top-n},700)}),function(t){t.fn.scrollTo=function(e){return t(this).scrollTop(t(this).scrollTop()-t(this).offset().top+t(e).offset().top),this},t.fn.dropdown=function(e){var n={inDuration:300,outDuration:225,constrain_width:!0,hover:!1,gutter:0,belowOrigin:!1,alignment:"left"};this.each(function(){function i(){void 0!==r.data("induration")&&(s.inDuration=r.data("inDuration")),void 0!==r.data("outduration")&&(s.outDuration=r.data("outDuration")),void 0!==r.data("constrainwidth")&&(s.constrain_width=r.data("constrainwidth")),void 0!==r.data("hover")&&(s.hover=r.data("hover")),void 0!==r.data("gutter")&&(s.gutter=r.data("gutter")),void 0!==r.data("beloworigin")&&(s.belowOrigin=r.data("beloworigin")),void 0!==r.data("alignment")&&(s.alignment=r.data("alignment"))}function o(e){"focus"===e&&(l=!0),i(),c.addClass("active"),r.addClass("active"),s.constrain_width===!0?c.css("width",r.outerWidth()):c.css("white-space","nowrap");var n=window.innerHeight,o=r.innerHeight(),a=r.offset().left,u=r.offset().top-t(window).scrollTop(),d=s.alignment,h=0,p=0,f=0;s.belowOrigin===!0&&(f=o);var m=0,g=r.parent();if(!g.is("body")&&g[0].scrollHeight>g[0].clientHeight&&(m=g[0].scrollTop),a+c.innerWidth()>t(window).width()?d="right":a-c.innerWidth()+r.innerWidth()<0&&(d="left"),u+c.innerHeight()>n)if(u+o-c.innerHeight()<0){var v=n-u-f;c.css("max-height",v)}else f||(f+=o),f-=c.innerHeight();if("left"===d)h=s.gutter,p=r.position().left+h;else if("right"===d){var y=r.position().left+r.outerWidth()-c.outerWidth();h=-s.gutter,p=y+h}c.css({position:"absolute",top:r.position().top+f+m,left:p}),c.stop(!0,!0).css("opacity",0).slideDown({queue:!1,duration:s.inDuration,easing:"easeOutCubic",complete:function(){t(this).css("height","")}}).animate({opacity:1},{queue:!1,duration:s.inDuration,easing:"easeOutSine"})}function a(){l=!1,c.fadeOut(s.outDuration),c.removeClass("active"),r.removeClass("active"),setTimeout(function(){c.css("max-height","")},s.outDuration)}var r=t(this),s=t.extend({},n,e),l=!1,c=t("#"+r.attr("data-activates"));if(i(),r.after(c),s.hover){var u=!1;r.unbind("click."+r.attr("id")),r.on("mouseenter",function(t){u===!1&&(o(),u=!0)}),r.on("mouseleave",function(e){t(e.toElement||e.relatedTarget).closest(".dropdown-content").is(c)||(c.stop(!0,!0),a(),u=!1)}),c.on("mouseleave",function(e){t(e.toElement||e.relatedTarget).closest(".dropdown-button").is(r)||(c.stop(!0,!0),a(),u=!1)})}else r.unbind("click."+r.attr("id")),r.bind("click."+r.attr("id"),function(e){l||(r[0]!=e.currentTarget||r.hasClass("active")||0!==t(e.target).closest(".dropdown-content").length?r.hasClass("active")&&(a(),t(document).unbind("click."+c.attr("id")+" touchstart."+c.attr("id"))):(e.preventDefault(),o("click")),c.hasClass("active")&&t(document).bind("click."+c.attr("id")+" touchstart."+c.attr("id"),function(e){c.is(e.target)||r.is(e.target)||r.find(e.target).length||(a(),t(document).unbind("click."+c.attr("id")+" touchstart."+c.attr("id")))}))});r.on("open",function(t,e){o(e)}),r.on("close",a)})},t(document).ready(function(){t(".dropdown-button").dropdown()})}(jQuery);var dropdownSelectors=$(".dropdown, .dropup");dropdownSelectors.on({"show.bs.dropdown":function(){var t=dropdownEffectData(this);dropdownEffectStart(t,t.effectIn)},"shown.bs.dropdown":function(){var t=dropdownEffectData(this);t.effectIn&&t.effectOut&&dropdownEffectEnd(t,function(){})},"hide.bs.dropdown":function(t){var e=dropdownEffectData(this);e.effectOut&&(t.preventDefault(),dropdownEffectStart(e,e.effectOut),dropdownEffectEnd(e,function(){e.dropdown.removeClass("open"),e.dropdown.removeClass("show")}))}}),function(t){function e(e){if($this=e,$this.hasClass("active")===!1){$this.addClass("active"),$this.find("ul .btn-floating").velocity({scaleY:".4",scaleX:".4",translateY:"40px"},{duration:0});var n=0;$this.find("ul .btn-floating").reverse().each(function(){t(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0"},{duration:80,delay:n}),n+=40})}else{$this.removeClass("active");var n=0;$this.find("ul .btn-floating").velocity("stop",!0),$this.find("ul .btn-floating").velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:"40px"},{duration:80})}}t(document).ready(function(){t.fn.reverse=[].reverse,t(document).on("mouseenter.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle)",function(e){n(t(this))}),t(document).on("mouseleave.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle)",function(e){i(t(this))}),t(document).on("click.fixedActionBtn",".fixed-action-btn.click-to-toggle > a",function(e){var o=t(this),a=o.parent();a.hasClass("active")?i(a):n(a)})}),t.fn.extend({openFAB:function(){n(t(this))},closeFAB:function(){i(t(this))}});var n=function(e){if($this=e,$this.hasClass("active")===!1){var n,i,o=$this.hasClass("horizontal");o===!0?i=40:n=40,$this.addClass("active"),$this.find("ul .btn-floating").velocity({scaleY:".4",scaleX:".4",translateY:n+"px",translateX:i+"px"},{duration:0});var a=0;$this.find("ul .btn-floating").reverse().each(function(){t(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0",translateX:"0"},{duration:80,delay:a}),a+=40})}},i=function(t){$this=t;var e,n,i=$this.hasClass("horizontal");i===!0?n=40:e=40,$this.removeClass("active");$this.find("ul .btn-floating").velocity("stop",!0),$this.find("ul .btn-floating").velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:e+"px",translateX:n+"px"},{duration:80})};t(".fixed-action-btn").on({click:function(n){return n.preventDefault(),e(t(".fixed-action-btn")),!1}})}(jQuery),function(t,e,n,i){"use strict";function o(t,e,n){return setTimeout(c(t,n),e)}function a(t,e,n){return!!Array.isArray(t)&&(r(t,n[e],n),!0)}function r(t,e,n){var o;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==i)for(o=0;o<t.length;)e.call(n,t[o],o,t),o++;else for(o in t)t.hasOwnProperty(o)&&e.call(n,t[o],o,t)}function s(e,n,i){var o="DEPRECATED METHOD: "+n+"\n"+i+" AT \n";return function(){var n=new Error("get-stack-trace"),i=n&&n.stack?n.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",a=t.console&&(t.console.warn||t.console.log);return a&&a.call(t.console,o,i),e.apply(this,arguments)}}function l(t,e,n){var i,o=e.prototype;i=t.prototype=Object.create(o),i.constructor=t,i._super=o,n&&ut(i,n)}function c(t,e){return function(){return t.apply(e,arguments)}}function u(t,e){return typeof t==pt?t.apply(e?e[0]||i:i,e):t}function d(t,e){return t===i?e:t}function h(t,e,n){r(g(e),function(e){t.addEventListener(e,n,!1)})}function p(t,e,n){r(g(e),function(e){t.removeEventListener(e,n,!1)})}function f(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function m(t,e){return t.indexOf(e)>-1}function g(t){return t.trim().split(/\s+/g)}function v(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function y(t){return Array.prototype.slice.call(t,0)}function b(t,e,n){for(var i=[],o=[],a=0;a<t.length;){var r=e?t[a][e]:t[a];v(o,r)<0&&i.push(t[a]),o[a]=r,a++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function x(t,e){for(var n,o,a=e[0].toUpperCase()+e.slice(1),r=0;r<dt.length;){if(n=dt[r],(o=n?n+a:e)in t)return o;r++}return i}function w(){return bt++}function k(e){var n=e.ownerDocument||e;return n.defaultView||n.parentWindow||t}function C(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){u(t.options.enable,[t])&&n.handler(e)},this.init()}function S(t){var e=t.options.inputClass;return new(e?e:kt?V:Ct?H:wt?Y:W)(t,T)}function T(t,e,n){var i=n.pointers.length,o=n.changedPointers.length,a=e&Tt&&i-o==0,r=e&(It|At)&&i-o==0;n.isFirst=!!a,n.isFinal=!!r,a&&(t.session={}),n.eventType=e,M(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function M(t,e){var n=t.session,i=e.pointers,o=i.length;n.firstInput||(n.firstInput=P(e)),o>1&&!n.firstMultiple?n.firstMultiple=P(e):1===o&&(n.firstMultiple=!1);var a=n.firstInput,r=n.firstMultiple,s=r?r.center:a.center,l=e.center=D(i);e.timeStamp=gt(),e.deltaTime=e.timeStamp-a.timeStamp,e.angle=L(s,l),e.distance=O(s,l),I(n,e),e.offsetDirection=E(e.deltaX,e.deltaY);var c=_(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=c.x,e.overallVelocityY=c.y,e.overallVelocity=mt(c.x)>mt(c.y)?c.x:c.y,e.scale=r?R(r.pointers,i):1,e.rotation=r?F(r.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,A(n,e);var u=t.element;f(e.srcEvent.target,u)&&(u=e.srcEvent.target),e.target=u}function I(t,e){var n=e.center,i=t.offsetDelta||{},o=t.prevDelta||{},a=t.prevInput||{};e.eventType!==Tt&&a.eventType!==It||(o=t.prevDelta={x:a.deltaX||0,y:a.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=o.x+(n.x-i.x),e.deltaY=o.y+(n.y-i.y)}function A(t,e){var n,o,a,r,s=t.lastInterval||e,l=e.timeStamp-s.timeStamp;if(e.eventType!=At&&(l>St||s.velocity===i)){var c=e.deltaX-s.deltaX,u=e.deltaY-s.deltaY,d=_(l,c,u);o=d.x,a=d.y,n=mt(d.x)>mt(d.y)?d.x:d.y,r=E(c,u),t.lastInterval=e}else n=s.velocity,o=s.velocityX,a=s.velocityY,r=s.direction;e.velocity=n,e.velocityX=o,e.velocityY=a,e.direction=r}function P(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:ft(t.pointers[n].clientX),clientY:ft(t.pointers[n].clientY)},n++;return{timeStamp:gt(),pointers:e,center:D(e),deltaX:t.deltaX,deltaY:t.deltaY}}function D(t){var e=t.length;if(1===e)return{x:ft(t[0].clientX),y:ft(t[0].clientY)};for(var n=0,i=0,o=0;o<e;)n+=t[o].clientX,i+=t[o].clientY,o++;return{x:ft(n/e),y:ft(i/e)}}function _(t,e,n){return{x:e/t||0,y:n/t||0}}function E(t,e){return t===e?Pt:mt(t)>=mt(e)?t<0?Dt:_t:e<0?Et:Ot}function O(t,e,n){n||(n=Wt);var i=e[n[0]]-t[n[0]],o=e[n[1]]-t[n[1]];return Math.sqrt(i*i+o*o)}function L(t,e,n){n||(n=Wt);var i=e[n[0]]-t[n[0]],o=e[n[1]]-t[n[1]];return 180*Math.atan2(o,i)/Math.PI}function F(t,e){return L(e[1],e[0],Vt)+L(t[1],t[0],Vt)}function R(t,e){return O(e[0],e[1],Vt)/O(t[0],t[1],Vt)}function W(){this.evEl=Nt,this.evWin=Ht,this.pressed=!1,C.apply(this,arguments)}function V(){this.evEl=jt,this.evWin=$t,C.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function z(){this.evTarget=qt,this.evWin=Ut,this.started=!1,C.apply(this,arguments)}function N(t,e){var n=y(t.touches),i=y(t.changedTouches);return e&(It|At)&&(n=b(n.concat(i),"identifier",!0)),[n,i]}function H(){this.evTarget=Zt,this.targetIds={},C.apply(this,arguments)}function B(t,e){var n=y(t.touches),i=this.targetIds;if(e&(Tt|Mt)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var o,a,r=y(t.changedTouches),s=[],l=this.target;if(a=n.filter(function(t){return f(t.target,l)}),e===Tt)for(o=0;o<a.length;)i[a[o].identifier]=!0,o++;for(o=0;o<r.length;)i[r[o].identifier]&&s.push(r[o]),e&(It|At)&&delete i[r[o].identifier],o++;return s.length?[b(a.concat(s),"identifier",!0),s]:void 0}function Y(){C.apply(this,arguments);var t=c(this.handler,this);this.touch=new H(this.manager,t),this.mouse=new W(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function j(t,e){t&Tt?(this.primaryTouch=e.changedPointers[0].identifier,$.call(this,e)):t&(It|At)&&$.call(this,e)}function $(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches,o=function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)};setTimeout(o,Gt)}}function X(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var o=this.lastTouches[i],a=Math.abs(e-o.x),r=Math.abs(n-o.y);if(a<=Kt&&r<=Kt)return!0}return!1}function q(t,e){this.manager=t,this.set(e)}function U(t){if(m(t,ie))return ie;var e=m(t,oe),n=m(t,ae);return e&&n?ie:e||n?e?oe:ae:m(t,ne)?ne:ee}function Q(t){this.options=ut({},this.defaults,t||{}),this.id=w(),this.manager=null,this.options.enable=d(this.options.enable,!0),this.state=se,this.simultaneous={},this.requireFail=[]}function Z(t){return t&he?"cancel":t&ue?"end":t&ce?"move":t&le?"start":""}function G(t){return t==Ot?"down":t==Et?"up":t==Dt?"left":t==_t?"right":""}function K(t,e){var n=e.manager;return n?n.get(t):t}function J(){Q.apply(this,arguments)}function tt(){J.apply(this,arguments),this.pX=null,this.pY=null}function et(){J.apply(this,arguments)}function nt(){Q.apply(this,arguments),this._timer=null,this._input=null}function it(){J.apply(this,arguments)}function ot(){J.apply(this,arguments)}function at(){Q.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function rt(t,e){return e=e||{},e.recognizers=d(e.recognizers,rt.defaults.preset),new st(t,e)}function st(t,e){this.options=ut({},rt.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=S(this),this.touchAction=new q(this,this.options.touchAction),lt(this,!0),r(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function lt(t,e){var n=t.element;if(n.style){var i;r(t.options.cssProps,function(o,a){i=x(n.style,a),e?(t.oldCssProps[i]=n.style[i],n.style[i]=o):n.style[i]=t.oldCssProps[i]||""}),e||(t.oldCssProps={})}}function ct(t,n){var i=e.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=n,n.target.dispatchEvent(i)}var ut,dt=["","webkit","Moz","MS","ms","o"],ht=e.createElement("div"),pt="function",ft=Math.round,mt=Math.abs,gt=Date.now;ut="function"!=typeof Object.assign?function(t){if(t===i||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var o=arguments[n];if(o!==i&&null!==o)for(var a in o)o.hasOwnProperty(a)&&(e[a]=o[a])}return e}:Object.assign;var vt=s(function(t,e,n){for(var o=Object.keys(e),a=0;a<o.length;)(!n||n&&t[o[a]]===i)&&(t[o[a]]=e[o[a]]),a++;return t},"extend","Use `assign`."),yt=s(function(t,e){return vt(t,e,!0)
},"merge","Use `assign`."),bt=1,xt=/mobile|tablet|ip(ad|hone|od)|android/i,wt="ontouchstart"in t,kt=x(t,"PointerEvent")!==i,Ct=wt&&xt.test(navigator.userAgent),St=25,Tt=1,Mt=2,It=4,At=8,Pt=1,Dt=2,_t=4,Et=8,Ot=16,Lt=Dt|_t,Ft=Et|Ot,Rt=Lt|Ft,Wt=["x","y"],Vt=["clientX","clientY"];C.prototype={handler:function(){},init:function(){this.evEl&&h(this.element,this.evEl,this.domHandler),this.evTarget&&h(this.target,this.evTarget,this.domHandler),this.evWin&&h(k(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&p(this.element,this.evEl,this.domHandler),this.evTarget&&p(this.target,this.evTarget,this.domHandler),this.evWin&&p(k(this.element),this.evWin,this.domHandler)}};var zt={mousedown:Tt,mousemove:Mt,mouseup:It},Nt="mousedown",Ht="mousemove mouseup";l(W,C,{handler:function(t){var e=zt[t.type];e&Tt&&0===t.button&&(this.pressed=!0),e&Mt&&1!==t.which&&(e=It),this.pressed&&(e&It&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:"mouse",srcEvent:t}))}});var Bt={pointerdown:Tt,pointermove:Mt,pointerup:It,pointercancel:At,pointerout:At},Yt={2:"touch",3:"pen",4:"mouse",5:"kinect"},jt="pointerdown",$t="pointermove pointerup pointercancel";t.MSPointerEvent&&!t.PointerEvent&&(jt="MSPointerDown",$t="MSPointerMove MSPointerUp MSPointerCancel"),l(V,C,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),o=Bt[i],a=Yt[t.pointerType]||t.pointerType,r="touch"==a,s=v(e,t.pointerId,"pointerId");o&Tt&&(0===t.button||r)?s<0&&(e.push(t),s=e.length-1):o&(It|At)&&(n=!0),s<0||(e[s]=t,this.callback(this.manager,o,{pointers:e,changedPointers:[t],pointerType:a,srcEvent:t}),n&&e.splice(s,1))}});var Xt={touchstart:Tt,touchmove:Mt,touchend:It,touchcancel:At},qt="touchstart",Ut="touchstart touchmove touchend touchcancel";l(z,C,{handler:function(t){var e=Xt[t.type];if(e===Tt&&(this.started=!0),this.started){var n=N.call(this,t,e);e&(It|At)&&n[0].length-n[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}}});var Qt={touchstart:Tt,touchmove:Mt,touchend:It,touchcancel:At},Zt="touchstart touchmove touchend touchcancel";l(H,C,{handler:function(t){var e=Qt[t.type],n=B.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}});var Gt=2500,Kt=25;l(Y,C,{handler:function(t,e,n){var i="touch"==n.pointerType,o="mouse"==n.pointerType;if(!(o&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)j.call(this,e,n);else if(o&&X.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Jt=x(ht.style,"touchAction"),te=Jt!==i,ee="auto",ne="manipulation",ie="none",oe="pan-x",ae="pan-y",re=function(){if(!te)return!1;var e={},n=t.CSS&&t.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(i){e[i]=!n||t.CSS.supports("touch-action",i)}),e}();q.prototype={set:function(t){"compute"==t&&(t=this.compute()),te&&this.manager.element.style&&re[t]&&(this.manager.element.style[Jt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return r(this.manager.recognizers,function(e){u(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),U(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var i=this.actions,o=m(i,ie)&&!re[ie],a=m(i,ae)&&!re[ae],r=m(i,oe)&&!re[oe];if(o){var s=1===t.pointers.length,l=t.distance<2,c=t.deltaTime<250;if(s&&l&&c)return}return r&&a?void 0:o||a&&n&Lt||r&&n&Ft?this.preventSrc(e):void 0},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var se=1,le=2,ce=4,ue=8,de=ue,he=16;Q.prototype={defaults:{},set:function(t){return ut(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(a(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=K(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return a(t,"dropRecognizeWith",this)?this:(t=K(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(a(t,"requireFailure",this))return this;var e=this.requireFail;return t=K(t,this),v(e,t)===-1&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(a(t,"dropRequireFailure",this))return this;t=K(t,this);var e=v(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,i=this.state;i<ue&&e(n.options.event+Z(i)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),i>=ue&&e(n.options.event+Z(i))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=32},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(32|se)))return!1;t++}return!0},recognize:function(t){var e=ut({},t);if(!u(this.options.enable,[this,e]))return this.reset(),void(this.state=32);this.state&(de|he|32)&&(this.state=se),this.state=this.process(e),this.state&(le|ce|ue|he)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},l(J,Q,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(le|ce),o=this.attrTest(t);return i&&(n&At||!o)?e|he:i||o?n&It?e|ue:e&le?e|ce:le:32}}),l(tt,J,{defaults:{event:"pan",threshold:10,pointers:1,direction:Rt},getTouchAction:function(){var t=this.options.direction,e=[];return t&Lt&&e.push(ae),t&Ft&&e.push(oe),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,o=t.direction,a=t.deltaX,r=t.deltaY;return o&e.direction||(e.direction&Lt?(o=0===a?Pt:a<0?Dt:_t,n=a!=this.pX,i=Math.abs(t.deltaX)):(o=0===r?Pt:r<0?Et:Ot,n=r!=this.pY,i=Math.abs(t.deltaY))),t.direction=o,n&&i>e.threshold&&o&e.direction},attrTest:function(t){return J.prototype.attrTest.call(this,t)&&(this.state&le||!(this.state&le)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=G(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),l(et,J,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[ie]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&le)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),l(nt,Q,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[ee]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,a=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(It|At)&&!a)this.reset();else if(t.eventType&Tt)this.reset(),this._timer=o(function(){this.state=de,this.tryEmit()},e.time,this);else if(t.eventType&It)return de;return 32},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===de&&(t&&t.eventType&It?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=gt(),this.manager.emit(this.options.event,this._input)))}}),l(it,J,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[ie]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&le)}}),l(ot,J,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Lt|Ft,pointers:1},getTouchAction:function(){return tt.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(Lt|Ft)?e=t.overallVelocity:n&Lt?e=t.overallVelocityX:n&Ft&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&mt(e)>this.options.velocity&&t.eventType&It},emit:function(t){var e=G(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),l(at,Q,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ne]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,a=t.deltaTime<e.time;if(this.reset(),t.eventType&Tt&&0===this.count)return this.failTimeout();if(i&&a&&n){if(t.eventType!=It)return this.failTimeout();var r=!this.pTime||t.timeStamp-this.pTime<e.interval,s=!this.pCenter||O(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,s&&r?this.count+=1:this.count=1,this._input=t;if(0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=o(function(){this.state=de,this.tryEmit()},e.interval,this),le):de}return 32},failTimeout:function(){return this._timer=o(function(){this.state=32},this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==de&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),rt.VERSION="2.0.7",rt.defaults={domEvents:!1,touchAction:"compute",enable:!0,inputTarget:null,inputClass:null,preset:[[it,{enable:!1}],[et,{enable:!1},["rotate"]],[ot,{direction:Lt}],[tt,{direction:Lt},["swipe"]],[at],[at,{event:"doubletap",taps:2},["tap"]],[nt]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};st.prototype={set:function(t){return ut(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,i=this.recognizers,o=e.curRecognizer;(!o||o&&o.state&de)&&(o=e.curRecognizer=null);for(var a=0;a<i.length;)n=i[a],2===e.stopped||o&&n!=o&&!n.canRecognizeWith(o)?n.reset():n.recognize(t),!o&&n.state&(le|ce|ue)&&(o=e.curRecognizer=n),a++}},get:function(t){if(t instanceof Q)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(a(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(a(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=v(e,t);n!==-1&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==i&&e!==i){var n=this.handlers;return r(g(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==i){var n=this.handlers;return r(g(t),function(t){e?n[t]&&n[t].splice(v(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&ct(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&lt(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},ut(rt,{INPUT_START:Tt,INPUT_MOVE:Mt,INPUT_END:It,INPUT_CANCEL:At,STATE_POSSIBLE:se,STATE_BEGAN:le,STATE_CHANGED:ce,STATE_ENDED:ue,STATE_RECOGNIZED:de,STATE_CANCELLED:he,STATE_FAILED:32,DIRECTION_NONE:Pt,DIRECTION_LEFT:Dt,DIRECTION_RIGHT:_t,DIRECTION_UP:Et,DIRECTION_DOWN:Ot,DIRECTION_HORIZONTAL:Lt,DIRECTION_VERTICAL:Ft,DIRECTION_ALL:Rt,Manager:st,Input:C,TouchAction:q,TouchInput:H,MouseInput:W,PointerEventInput:V,TouchMouseInput:Y,SingleTouchInput:z,Recognizer:Q,AttrRecognizer:J,Tap:at,Pan:tt,Swipe:ot,Pinch:et,Rotate:it,Press:nt,on:h,off:p,each:r,merge:yt,extend:vt,assign:ut,inherit:l,bindFn:c,prefixed:x}),(void 0!==t?t:"undefined"!=typeof self?self:{}).Hammer=rt,"function"==typeof define&&define.amd?define(function(){return rt}):"undefined"!=typeof module&&module.exports?module.exports=rt:t.Hammer=rt}(window,document),function(t){"function"==typeof define&&define.amd?define(["jquery","hammerjs"],t):"object"==typeof exports?t(require("jquery"),require("hammerjs")):t(jQuery,Hammer)}(function(t,e){function n(n,i){var o=t(n);o.data("hammer")||o.data("hammer",new e(o[0],i))}t.fn.hammer=function(t){return this.each(function(){n(this,t)})},e.Manager.prototype.emit=function(e){return function(n,i){e.call(this,n,i),t(this.element).trigger({type:n,gesture:i})}}(e.Manager.prototype.emit)});var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=240,n=1440,i=function(){function i(o,a){var r=this;_classCallCheck(this,i);var s=!1,l={menuWidth:e,edge:"left",closeOnClick:!1};a=t.extend(l,a),this.options=a;var c=o;this.menu_id=t("#"+c.attr("data-activates"));var u=t("#"+this.menu_id.attr("id")+"> .sidenav-bg");a.menuWidth!=e&&(this.menu_id.css("width",a.menuWidth),u.css("width",a.menuWidth));var d=t('<div class="drag-target"></div>');t("body").append(d),"left"==a.edge?(this.menu_id.css("transform","translateX(-100%)"),d.css({left:0})):(this.menu_id.addClass("right-aligned").css("transform","translateX(100%)"),d.css({right:0})),this.menu_id.hasClass("fixed")&&(window.innerWidth>n&&this.menu_id.css("transform","translateX(0)"),t(window).resize(function(){window.innerWidth>n?t("#sidenav-overlay").length?r.removeMenu(!0):r.menu_id.css("transform","translateX(0%)"):s===!1&&("left"===a.edge?r.menu_id.css("transform","translateX(-100%)"):r.menu_id.css("transform","translateX(100%)"))})),this.options.closeOnClick===!0&&this.menu_id.on("click","a:not(.collapsible-header)",function(){sn.removeMenu()}),c.click(function(e){if(e.preventDefault(),s===!0)s=!1,r.removeMenu();else{var n=t("body"),i=t('<div id="sidenav-overlay"></div>');n.append(i),"left"===r.options.edge?r.menu_id.velocity({translateX:[0,-1*a.menuWidth]},{duration:300,queue:!1,easing:"easeOutQuad"}):r.menu_id.velocity({translateX:[0,a.menuWidth]},{duration:300,queue:!1,easing:"easeOutQuad"}),i.click(function(){r.removeMenu()})}}),d.click(function(t){r.removeMenu()}),d.hammer({prevent_default:!1}).bind("pan",function(e){if("touch"==e.gesture.pointerType){var n=(e.gesture.direction,e.gesture.center.x),i=(e.gesture.center.y,e.gesture.velocityX,t("body")),o=i.innerWidth();if(i.css("overflow","hidden"),i.width(o),0===t("#sidenav-overlay").length){var l=t('<div id="sidenav-overlay"></div>');l.css("opacity",0).click(function(t){r.removeMenu()}),t("body").append(l)}if("left"===a.edge&&(n>a.menuWidth?n=a.menuWidth:n<0&&(n=0)),"left"===a.edge)n<a.menuWidth/2?s=!1:n>=a.menuWidth/2&&(s=!0),r.menu_id.css("transform","translateX("+(n-a.menuWidth)+"px)");else{n<window.innerWidth-a.menuWidth/2?s=!0:n>=window.innerWidth-a.menuWidth/2&&(s=!1);var c=n-a.menuWidth/2;c<0&&(c=0),r.menu_id.css("transform","translateX("+c+"px)")}var u;"left"===a.edge?(u=n/a.menuWidth,t("#sidenav-overlay").velocity({opacity:u},{duration:10,queue:!1,easing:"easeOutQuad"})):(u=Math.abs((n-window.innerWidth)/a.menuWidth),t("#sidenav-overlay").velocity({opacity:u},{duration:10,queue:!1,easing:"easeOutQuad"}))}}).bind("panend",function(e){if("touch"==e.gesture.pointerType){var n=e.gesture.velocityX,i=e.gesture.center.x,o=i-a.menuWidth,l=i-a.menuWidth/2;o>0&&(o=0),l<0&&(l=0),"left"===a.edge?s&&n<=.3||n<-.5?(0!=o&&r.menu_id.velocity({translateX:[0,o]},{duration:300,queue:!1,easing:"easeOutQuad"}),t("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),d.css({width:"10px",right:"",left:0})):(!s||n>.3)&&(t("body").css({overflow:"",width:""}),r.menu_id.velocity({translateX:[-1*a.menuWidth-10,o]},{duration:200,queue:!1,easing:"easeOutQuad"}),t("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){t(this).remove()}}),d.css({width:"10px",right:"",left:0})):s&&n>=-.3||n>.5?(r.menu_id.velocity({translateX:[0,l]},{duration:300,queue:!1,easing:"easeOutQuad"}),t("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),d.css({width:"50%",right:"",left:0})):(!s||n<-.3)&&(t("body").css({overflow:"",width:""}),r.menu_id.velocity({translateX:[a.menuWidth+10,l]},{duration:200,queue:!1,easing:"easeOutQuad"}),t("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){t(r).remove()}}),d.css({width:"10px",right:0,left:""}))}})}return _createClass(i,[{key:"removeMenu",value:function(e){var n=this;this.options.menuWidth,window.innerWidth;t("body").css({overflow:"",width:""}),"left"===this.options.edge?this.menu_id.velocity({translateX:"-100%"},{duration:200,queue:!1,easing:"easeOutCubic",complete:function(){e===!0&&(n.menu_id.removeAttr("style"),n.menu_id.css("width",n.options.menuWidth))}}):this.menu_id.velocity({translateX:"100%"},{duration:200,queue:!1,easing:"easeOutCubic",complete:function(){e===!0&&(n.menu_id.removeAttr("style"),n.menu_id.css("width",n.options.menuWidth))}}),t("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){t("#sidenav-overlay").remove()}})}},{key:"show",value:function(){this.trigger("click")}},{key:"hide",value:function(){t("#sidenav-overlay").trigger("click")}}]),i}();t.fn.sideNav=function(e){return this.each(function(){new i(t(this),e)})}}(jQuery),function(t){t.fn.collapsible=function(e){var n={accordion:void 0};return e=t.extend(n,e),this.each(function(){function n(e){s=r.find("> li > .collapsible-header"),e.hasClass("active")?e.parent().addClass("active"):e.parent().removeClass("active"),e.parent().hasClass("active")?e.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){t(this).css("height","")}}):e.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){t(this).css("height","")}}),s.not(e).removeClass("active").parent().removeClass("active"),s.not(e).parent().children(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){t(this).css("height","")}})}function i(e){e.hasClass("active")?e.parent().addClass("active"):e.parent().removeClass("active"),e.parent().hasClass("active")?e.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){t(this).css("height","")}}):e.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){t(this).css("height","")}})}function o(t){return a(t).length>0}function a(t){return t.closest("li > .collapsible-header")}var r=t(this),s=t(this).find("> li > .collapsible-header"),l=r.data("collapsible");r.off("click.collapse",".collapsible-header"),s.off("click.collapse"),e.accordion||"accordion"===l||void 0===l?(s=r.find("> li > .collapsible-header"),s.on("click.collapse",function(e){var i=t(e.target);o(i)&&(i=a(i)),i.toggleClass("active"),n(i)}),n(s.filter(".active").first())):s.each(function(){t(this).on("click.collapse",function(e){var n=t(e.target);o(n)&&(n=a(n)),n.toggleClass("active"),i(n)}),t(this).hasClass("active")&&i(t(this))})})},t(document).ready(function(){t(".collapsible").collapsible()})}(jQuery),function(t,e){"function"==typeof define&&define.amd?define(["jquery"],function(t){return e(t)}):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(0,function(t){var e=function(t,e){var n,i=document.createElement("canvas");t.appendChild(i),"object"==typeof G_vmlCanvasManager&&G_vmlCanvasManager.initElement(i);var o=i.getContext("2d");i.width=i.height=e.size;var a=1;window.devicePixelRatio>1&&(a=window.devicePixelRatio,i.style.width=i.style.height=[e.size,"px"].join(""),i.width=i.height=e.size*a,o.scale(a,a)),o.translate(e.size/2,e.size/2),o.rotate((-.5+e.rotate/180)*Math.PI);var r=(e.size-e.lineWidth)/2;e.scaleColor&&e.scaleLength&&(r-=e.scaleLength+2),Date.now=Date.now||function(){return+new Date};var s=function(t,e,n){n=Math.min(Math.max(-1,n||0),1);var i=n<=0;o.beginPath(),o.arc(0,0,r,0,2*Math.PI*n,i),o.strokeStyle=t,o.lineWidth=e,o.stroke()},l=function(){var t,n;o.lineWidth=1,o.fillStyle=e.scaleColor,o.save();for(var i=24;i>0;--i)i%6==0?(n=e.scaleLength,t=0):(n=.6*e.scaleLength,t=e.scaleLength-n),o.fillRect(-e.size/2+t,0,n,1),o.rotate(Math.PI/12);o.restore()},c=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}(),u=function(){e.scaleColor&&l(),e.trackColor&&s(e.trackColor,e.trackWidth||e.lineWidth,1)};this.getCanvas=function(){return i},this.getCtx=function(){return o},this.clear=function(){o.clearRect(e.size/-2,e.size/-2,e.size,e.size)},this.draw=function(t){e.scaleColor||e.trackColor?o.getImageData&&o.putImageData?n?o.putImageData(n,0,0):(u(),n=o.getImageData(0,0,e.size*a,e.size*a)):(this.clear(),u()):this.clear(),o.lineCap=e.lineCap;var i;i="function"==typeof e.barColor?e.barColor(t):e.barColor,s(i,e.lineWidth,t/100)}.bind(this),this.animate=function(t,n){var i=Date.now();e.onStart(t,n);var o=function(){var a=Math.min(Date.now()-i,e.animate.duration),r=e.easing(this,a,t,n-t,e.animate.duration);this.draw(r),e.onStep(t,n,r),a>=e.animate.duration?e.onStop(t,n):c(o)}.bind(this);c(o)}.bind(this)},n=function(t,n){var i={barColor:"#ef1e25",trackColor:"#f9f9f9",scaleColor:"#dfe0e0",scaleLength:5,lineCap:"round",lineWidth:3,trackWidth:void 0,size:110,rotate:0,animate:{duration:1e3,enabled:!0},easing:function(t,e,n,i,o){return e/=o/2,e<1?i/2*e*e+n:-i/2*(--e*(e-2)-1)+n},onStart:function(t,e){},onStep:function(t,e,n){},onStop:function(t,e){}};if(void 0!==e)i.renderer=e;else{if("undefined"==typeof SVGRenderer)throw new Error("Please load either the SVG- or the CanvasRenderer");i.renderer=SVGRenderer}var o={},a=0,r=function(){this.el=t,this.options=o;for(var e in i)i.hasOwnProperty(e)&&(o[e]=n&&void 0!==n[e]?n[e]:i[e],"function"==typeof o[e]&&(o[e]=o[e].bind(this)));"string"==typeof o.easing&&"undefined"!=typeof jQuery&&jQuery.isFunction(jQuery.easing[o.easing])?o.easing=jQuery.easing[o.easing]:o.easing=i.easing,"number"==typeof o.animate&&(o.animate={duration:o.animate,enabled:!0}),"boolean"!=typeof o.animate||o.animate||(o.animate={duration:1e3,enabled:o.animate}),this.renderer=new o.renderer(t,o),this.renderer.draw(a),t.dataset&&t.dataset.percent?this.update(parseFloat(t.dataset.percent)):t.getAttribute&&t.getAttribute("data-percent")&&this.update(parseFloat(t.getAttribute("data-percent")))}.bind(this);this.update=function(t){return t=parseFloat(t),o.animate.enabled?this.renderer.animate(a,t):this.renderer.draw(t),a=t,this}.bind(this),this.disableAnimation=function(){return o.animate.enabled=!1,this},this.enableAnimation=function(){return o.animate.enabled=!0,this},r()};t.fn.easyPieChart=function(e){return this.each(function(){var i;t.data(this,"easyPieChart")||(i=t.extend({},e,t(this).data()),t.data(this,"easyPieChart",new n(this,i)))})}}),function(t){var e="input[type=range]",n=!1,i=void 0,o=function(){var e=t('<span class="thumb"><span class="value"></span></span>');t(this).after(e)};t(e).each(o),t(document).on("change",e,function(e){var n=t(this);n.siblings(".thumb").find(".value").html(n.val())}),t(document).on("input mousedown touchstart",e,function(e){var a=t(this),r=a.siblings(".thumb"),s=(r.find(".value"),a.outerWidth());(!r.length&&o(),r.find(".value").html(a.val()),n=!0,a.addClass("active"),r.hasClass("active")||r.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"}),"input"!==e.type)&&(i=void 0===e.pageX||null===e.pageX?e.originalEvent.touches[0].pageX-t(this).offset().left:e.pageX-t(this).offset().left,i<0?i=0:i>s&&(i=s),r.addClass("active").css("left",i));r.find(".value").html(a.val())}),t(document).on("mouseup touchend",".range-field",function(e){n=!1,t(this).removeClass("active")}),t(document).on("mousemove touchmove",".range-field",function(i){var o=t(this).children(".thumb"),a=void 0;if(n){o.hasClass("active")||o.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"});a=void 0===i.pageX||null===i.pageX?i.originalEvent.touches[0].pageX-t(this).offset().left:i.pageX-t(this).offset().left;var r=t(this).outerWidth();a<0?a=0:a>r&&(a=r),o.addClass("active").css("left",a),o.find(".value").html(o.siblings(e).val())}}),t(document).on("mouseout touchleave",".range-field",function(e){if(!n){var i=t(this).children(".thumb");i.hasClass("active")&&i.velocity({height:"0",width:"0",top:"10px",marginLeft:"-6px"},{duration:100}),i.removeClass("active")}})}(jQuery),function(t){t(document).on("change",'.file-field input[type="file"]',function(e){for(var n=t(e.target),i=n.closest(".file-field"),o=i.find("input.file-path"),a=n[0].files,r=[],s=0;s<a.length;s++){var l=a[s].name;r.push(l)}o.val(r.join(", ")),o.trigger("change")})}(jQuery),function(t){t.fn.material_select=function(e){function n(t,e,n){var o=t.indexOf(e),a=o===-1;return a?t.push(e):t.splice(o,1),n.siblings("ul.dropdown-content").find("li").eq(e).toggleClass("active"),n.find("option").eq(e).prop("selected",a),i(t,n),a}function i(t,e){for(var n="",i=0,o=t.length;i<o;i++){var a=e.find("option").eq(t[i]).text();n+=0===i?a:", "+a}""===n&&(n=e.find("option:disabled").eq(0).text()),e.siblings("input.select-dropdown").val(n)}function o(){var t=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==e?n:3&n|8).toString(16)})}t(this).each(function(){var i=t(this);if(!i.hasClass("browser-default")){var a=!!i.attr("multiple"),r=i.data("select-id");if(r&&(i.parent().find("span.caret").remove(),i.parent().find("input").remove(),i.unwrap(),t("ul#select-options-"+r).remove()),"destroy"===e)return void i.data("select-id",null).removeClass("initialized");var s=o();i.data("select-id",s);var l=t('<div class="select-wrapper"></div>');l.addClass(i.attr("class"));var c=t('<ul id="select-options-'+s+'" class="dropdown-content select-dropdown '+(a?"multiple-select-dropdown":"")+'"></ul>'),u=i.children("option, optgroup"),d=[],h=!1,p=i.find("option:selected").html()||i.find("option:first").html()||"",f=function(){var e=t(this).closest("ul"),n=t(this).val();e.find("li").find("span.filtrable").each(function(){"string"==typeof this.outerText&&(this.outerText.toLowerCase().indexOf(n.toLowerCase())===-1?(t(this).hide(),t(this).parent().hide()):(t(this).show(),t(this).parent().show()))})},m=!!i.attr("searchable");m&&function(){var e=i.attr("searchable"),n=t('<span class="search-wrap"><input type="text" class="search" placeholder="'+e+'"></span>');c.append(n),n.find(".search").keyup(f)}();var g=function(e,n,i){var o=n.is(":disabled")?"disabled ":"",a="optgroup-option"===i?"optgroup-option ":"",r=n.data("icon"),s=n.attr("class");if(r){var l="";return s&&(l=' class="'+s+'"'),"multiple"===i?c.append(t('<li class="'+o+'"><img alt="" src="'+r+'"'+l+'><span class="filtrable"><input type="checkbox"'+o+"/><label></label>"+n.html()+"</span></li>")):c.append(t('<li class="'+o+a+'"><img alt="" src="'+r+'"'+l+'><span class="filtrable">'+n.html()+"</span></li>")),!0}"multiple"===i?c.append(t('<li class="'+o+'"><span class="filtrable"><input type="checkbox"'+o+"/><label></label>"+n.html()+"</span></li>")):c.append(t('<li class="'+o+a+'"><span class="filtrable">'+n.html()+"</span></li>"))};u.length&&u.each(function(){if(t(this).is("option"))a?g(0,t(this),"multiple"):g(0,t(this));else if(t(this).is("optgroup")){var e=t(this).children("option");c.append(t('<li class="optgroup"><span>'+t(this).attr("label")+"</span></li>")),e.each(function(){g(0,t(this),"optgroup-option")})}}),c.find("li:not(.optgroup)").each(function(o){t(this).click(function(r){if(!t(this).hasClass("disabled")&&!t(this).hasClass("optgroup")){var s=!0;a?(t('input[type="checkbox"]',this).prop("checked",function(t,e){return!e}),s=n(d,t(this).index(),i),b.trigger("focus")):(c.find("li").removeClass("active"),t(this).toggleClass("active"),b.val(t(this).text())),x(c,t(this)),i.find("option").eq(o).prop("selected",s),i.trigger("change"),void 0!==e&&e()}r.stopPropagation()})}),i.wrap(l);var v=t('<span class="caret">&#9660;</span>');i.is(":disabled")&&v.addClass("disabled");var y=p.replace(/"/g,"&quot;"),b=t('<input type="text" class="select-dropdown" readonly="true" '+(i.is(":disabled")?"disabled":"")+' data-activates="select-options-'+s+'" value="'+y+'"/>');i.before(b),b.before(v),b.after(c),i.is(":disabled")||b.dropdown({hover:!1,closeOnClick:!1}),i.attr("tabindex")&&t(b[0]).attr("tabindex",i.attr("tabindex")),i.addClass("initialized"),b.on({focus:function(){if(t("ul.select-dropdown").not(c[0]).is(":visible")&&t("input.select-dropdown").trigger("close"),!c.is(":visible")){t(this).trigger("open",["focus"]);var e=t(this).val();x(c,c.find("li").filter(function(){return t(this).text().toLowerCase()===e.toLowerCase()})[0])}},click:function(t){t.stopPropagation()}}),b.on("blur",function(){a||m||t(this).trigger("close"),c.find("li.selected").removeClass("selected")}),!a&&m&&c.find("li").on("click",function(){b.trigger("close")}),c.hover(function(){h=!0},function(){h=!1}),t(window).on({click:function(){(a||m)&&(h||b.trigger("close"))}}),a&&i.find("option:selected:not(:disabled)").each(function(){var e=t(this).index();n(d,e,i),c.find("li").eq(e).find(":checkbox").prop("checked",!0)});var x=function(e,n){if(n){e.find("li.selected").removeClass("selected");var i=t(n);i.addClass("selected"),c.scrollTo(i)}},w=[],k=function(e){if(9==e.which)return void b.trigger("close");if(40==e.which&&!c.is(":visible"))return void b.trigger("open");if(13!=e.which||c.is(":visible")){e.preventDefault();var n=String.fromCharCode(e.which).toLowerCase(),i=[9,13,27,38,40];if(n&&i.indexOf(e.which)===-1){w.push(n);var o=w.join(""),r=c.find("li").filter(function(){return 0===t(this).text().toLowerCase().indexOf(o)})[0];r&&x(c,r)}if(13==e.which){var s=c.find("li.selected:not(.disabled)")[0];s&&(t(s).trigger("click"),a||b.trigger("close"))}40==e.which&&(r=c.find("li.selected").length?c.find("li.selected").next("li:not(.disabled)")[0]:c.find("li:not(.disabled)")[0],x(c,r)),27==e.which&&b.trigger("close"),38==e.which&&(r=c.find("li.selected").prev("li:not(.disabled)")[0])&&x(c,r),setTimeout(function(){w=[]},1e3)}};b.on("keydown",k)}})}}(jQuery),jQuery("select").siblings("input.select-dropdown").on("mousedown",function(t){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(t.clientX>=t.target.clientWidth||t.clientY>=t.target.clientHeight)&&t.preventDefault()}),function(t){"function"==typeof define&&define.amd?define("picker",["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):this.Picker=t(jQuery)}(function(t){function e(a,r,l,h){function p(){return e._.node("div",e._.node("div",e._.node("div",e._.node("div",I.component.nodes(k.open),S.box),S.wrap),S.frame),S.holder,'tabindex="-1"')}function f(){T.data(r,I).addClass(S.input).val(T.data("value")?I.get("select",C.format):a.value),C.editable||T.on("focus."+k.id+" click."+k.id,function(t){t.preventDefault(),I.open()}).on("keydown."+k.id,x),o(a,{haspopup:!0,expanded:!1,readonly:!1,owns:a.id+"_root"})}function m(){o(I.$root[0],"hidden",!0)}function g(){I.$holder.on({keydown:x,"focus.toOpen":b,blur:function(){T.removeClass(S.target)},focusin:function(t){I.$root.removeClass(S.focused),t.stopPropagation()},"mousedown click":function(e){var n=e.target;n!=I.$holder[0]&&(e.stopPropagation(),"mousedown"!=e.type||t(n).is("input, select, textarea, button, option")||(e.preventDefault(),I.$holder[0].focus()))}}).on("click","[data-pick], [data-nav], [data-clear], [data-close]",function(){var e=t(this),n=e.data(),i=e.hasClass(S.navDisabled)||e.hasClass(S.disabled),o=s()
;o=o&&(o.type||o.href),(i||o&&!t.contains(I.$root[0],o))&&I.$holder[0].focus(),!i&&n.nav?I.set("highlight",I.component.item.highlight,{nav:n.nav}):!i&&"pick"in n?(I.set("select",n.pick),C.closeOnSelect&&I.close(!0)):n.clear?(I.clear(),C.closeOnClear&&I.close(!0)):n.close&&I.close(!0)})}function v(){var e;C.hiddenName===!0?(e=a.name,a.name=""):(e=["string"==typeof C.hiddenPrefix?C.hiddenPrefix:"","string"==typeof C.hiddenSuffix?C.hiddenSuffix:"_submit"],e=e[0]+a.name+e[1]),I._hidden=t('<input type=hidden name="'+e+'"'+(T.data("value")||a.value?' value="'+I.get("select",C.formatSubmit)+'"':"")+">")[0],T.on("change."+k.id,function(){I._hidden.value=a.value?I.get("select",C.formatSubmit):""})}function y(){w&&d?I.$holder.find("."+S.frame).one("transitionend",function(){I.$holder[0].focus()}):I.$holder[0].focus()}function b(t){t.stopPropagation(),T.addClass(S.target),I.$root.addClass(S.focused),I.open()}function x(t){var e=t.keyCode,n=/^(8|46)$/.test(e);if(27==e)return I.close(!0),!1;(32==e||n||!k.open&&I.component.key[e])&&(t.preventDefault(),t.stopPropagation(),n?I.clear().close():I.open())}if(!a)return e;var w=!1,k={id:a.id||"P"+Math.abs(~~(Math.random()*new Date))},C=l?t.extend(!0,{},l.defaults,h):h||{},S=t.extend({},e.klasses(),C.klass),T=t(a),M=function(){return this.start()},I=M.prototype={constructor:M,$node:T,start:function(){return k&&k.start?I:(k.methods={},k.start=!0,k.open=!1,k.type=a.type,a.autofocus=a==s(),a.readOnly=!C.editable,a.id=a.id||k.id,"text"!=a.type&&(a.type="text"),I.component=new l(I,C),I.$root=t('<div class="'+S.picker+'" id="'+a.id+'_root" />'),m(),I.$holder=t(p()).appendTo(I.$root),g(),C.formatSubmit&&v(),f(),C.containerHidden?t(C.containerHidden).append(I._hidden):T.after(I._hidden),C.container?t(C.container).append(I.$root):T.after(I.$root),I.on({start:I.component.onStart,render:I.component.onRender,stop:I.component.onStop,open:I.component.onOpen,close:I.component.onClose,set:I.component.onSet}).on({start:C.onStart,render:C.onRender,stop:C.onStop,open:C.onOpen,close:C.onClose,set:C.onSet}),w=n(I.$holder[0]),a.autofocus&&I.open(),I.trigger("start").trigger("render"))},render:function(e){return e?(I.$holder=t(p()),g(),I.$root.html(I.$holder)):I.$root.find("."+S.box).html(I.component.nodes(k.open)),I.trigger("render")},stop:function(){return k.start?(I.close(),I._hidden&&I._hidden.parentNode.removeChild(I._hidden),I.$root.remove(),T.removeClass(S.input).removeData(r),setTimeout(function(){T.off("."+k.id)},0),a.type=k.type,a.readOnly=!1,I.trigger("stop"),k.methods={},k.start=!1,I):I},open:function(n){return k.open?I:(T.addClass(S.active),o(a,"expanded",!0),setTimeout(function(){I.$root.addClass(S.opened),o(I.$root[0],"hidden",!1)},0),n!==!1&&(k.open=!0,w&&u.css("overflow","hidden").css("padding-right","+="+i()),y(),c.on("click."+k.id+" focusin."+k.id,function(t){var e=t.target;e!=a&&e!=document&&3!=t.which&&I.close(e===I.$holder[0])}).on("keydown."+k.id,function(n){var i=n.keyCode,o=I.component.key[i],a=n.target;27==i?I.close(!0):a!=I.$holder[0]||!o&&13!=i?t.contains(I.$root[0],a)&&13==i&&(n.preventDefault(),a.click()):(n.preventDefault(),o?e._.trigger(I.component.key.go,I,[e._.trigger(o)]):I.$root.find("."+S.highlighted).hasClass(S.disabled)||(I.set("select",I.component.item.highlight),C.closeOnSelect&&I.close(!0)))})),I.trigger("open"))},close:function(t){return t&&(C.editable?a.focus():(I.$holder.off("focus.toOpen").focus(),setTimeout(function(){I.$holder.on("focus.toOpen",b)},0))),T.removeClass(S.active),o(a,"expanded",!1),setTimeout(function(){I.$root.removeClass(S.opened+" "+S.focused),o(I.$root[0],"hidden",!0)},0),k.open?(k.open=!1,w&&u.css("overflow","").css("padding-right","-="+i()),c.off("."+k.id),I.trigger("close")):I},clear:function(t){return I.set("clear",null,t)},set:function(e,n,i){var o,a,r=t.isPlainObject(e),s=r?e:{};if(i=r&&t.isPlainObject(n)?n:i||{},e){r||(s[e]=n);for(o in s)a=s[o],o in I.component.item&&(void 0===a&&(a=null),I.component.set(o,a,i)),"select"!=o&&"clear"!=o||T.val("clear"==o?"":I.get(o,C.format)).trigger("change");I.render()}return i.muted?I:I.trigger("set",s)},get:function(t,n){if(t=t||"value",null!=k[t])return k[t];if("valueSubmit"==t){if(I._hidden)return I._hidden.value;t="value"}if("value"==t)return a.value;if(t in I.component.item){if("string"==typeof n){var i=I.component.get(t);return i?e._.trigger(I.component.formats.toString,I.component,[n,i]):""}return I.component.get(t)}},on:function(e,n,i){var o,a,r=t.isPlainObject(e),s=r?e:{};if(e){r||(s[e]=n);for(o in s)a=s[o],i&&(o="_"+o),k.methods[o]=k.methods[o]||[],k.methods[o].push(a)}return I},off:function(){var t,e,n=arguments;for(t=0,namesCount=n.length;t<namesCount;t+=1)(e=n[t])in k.methods&&delete k.methods[e];return I},trigger:function(t,n){var i=function(t){var i=k.methods[t];i&&i.map(function(t){e._.trigger(t,I,[n])})};return i("_"+t),i(t),I}};return new M}function n(t){var e;return t.currentStyle?e=t.currentStyle.position:window.getComputedStyle&&(e=getComputedStyle(t).position),"fixed"==e}function i(){if(u.height()<=l.height())return 0;var e=t('<div style="visibility:hidden;width:100px" />').appendTo("body"),n=e[0].offsetWidth;e.css("overflow","scroll");var i=t('<div style="width:100%" />').appendTo(e),o=i[0].offsetWidth;return e.remove(),n-o}function o(e,n,i){if(t.isPlainObject(n))for(var o in n)a(e,o,n[o]);else a(e,n,i)}function a(t,e,n){t.setAttribute(("role"==e?"":"aria-")+e,n)}function r(e,n){t.isPlainObject(e)||(e={attribute:n}),n="";for(var i in e){var o=("role"==i?"":"aria-")+i;n+=null==e[i]?"":o+'="'+e[i]+'"'}return n}function s(){try{return document.activeElement}catch(t){}}var l=t(window),c=t(document),u=t(document.documentElement),d=null!=document.documentElement.style.transition;return e.klasses=function(t){return t=t||"picker",{picker:t,opened:t+"--opened",focused:t+"--focused",input:t+"__input",active:t+"__input--active",target:t+"__input--target",holder:t+"__holder",frame:t+"__frame",wrap:t+"__wrap",box:t+"__box"}},e._={group:function(t){for(var n,i="",o=e._.trigger(t.min,t);o<=e._.trigger(t.max,t,[o]);o+=t.i)n=e._.trigger(t.item,t,[o]),i+=e._.node(t.node,n[0],n[1],n[2]);return i},node:function(e,n,i,o){return n?(n=t.isArray(n)?n.join(""):n,i=i?' class="'+i+'"':"",o=o?" "+o:"","<"+e+i+o+">"+n+"</"+e+">"):""},lead:function(t){return(t<10?"0":"")+t},trigger:function(t,e,n){return"function"==typeof t?t.apply(e,n||[]):t},digits:function(t){return/\d/.test(t[1])?2:1},isDate:function(t){return{}.toString.call(t).indexOf("Date")>-1&&this.isInteger(t.getDate())},isInteger:function(t){return{}.toString.call(t).indexOf("Number")>-1&&t%1==0},ariaAttr:r},e.extend=function(n,i){t.fn[n]=function(o,a){var r=this.data(n);return"picker"==o?r:r&&"string"==typeof o?e._.trigger(r[o],r,[a]):this.each(function(){t(this).data(n)||new e(this,n,i,o)})},t.fn[n].defaults=i.defaults},e}),function(t){"function"==typeof define&&define.amd?define(["picker","jquery"],t):"object"==typeof exports?module.exports=t(require("./picker.js"),require("jquery")):t(Picker,jQuery)}(function(t,e){function n(t,e){var n=this,i=t.$node[0],o=i.value,a=t.$node.data("value"),r=a||o,s=a?e.formatSubmit:e.format,l=function(){return i.currentStyle?"rtl"==i.currentStyle.direction:"rtl"==getComputedStyle(t.$root[0]).direction};n.settings=e,n.$node=t.$node,n.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},n.item={},n.item.clear=null,n.item.disable=(e.disable||[]).slice(0),n.item.enable=-function(t){return t[0]===!0?t.shift():-1}(n.item.disable),n.set("min",e.min).set("max",e.max).set("now"),r?n.set("select",r,{format:s,defaultValue:!0}):n.set("select",null).set("highlight",n.item.now),n.key={40:7,38:-7,39:function(){return l()?-1:1},37:function(){return l()?1:-1},go:function(t){var e=n.item.highlight,i=new Date(e.year,e.month,e.date+t);n.set("highlight",i,{interval:t}),this.render()}},t.on("render",function(){t.$root.find("."+e.klass.selectMonth).on("change",function(){var n=this.value;n&&(t.set("highlight",[t.get("view").year,n,t.get("highlight").date]),t.$root.find("."+e.klass.selectMonth).trigger("focus"))}),t.$root.find("."+e.klass.selectYear).on("change",function(){var n=this.value;n&&(t.set("highlight",[n,t.get("view").month,t.get("highlight").date]),t.$root.find("."+e.klass.selectYear).trigger("focus"))})},1).on("open",function(){var i="";n.disabled(n.get("now"))&&(i=":not(."+e.klass.buttonToday+")"),t.$root.find("button"+i+", select").attr("disabled",!1)},1).on("close",function(){t.$root.find("button, select").attr("disabled",!0)},1)}var i=t._;n.prototype.set=function(t,e,n){var i=this,o=i.item;return null===e?("clear"==t&&(t="select"),o[t]=e,i):(o["enable"==t?"disable":"flip"==t?"enable":t]=i.queue[t].split(" ").map(function(o){return e=i[o](t,e,n)}).pop(),"select"==t?i.set("highlight",o.select,n):"highlight"==t?i.set("view",o.highlight,n):t.match(/^(flip|min|max|disable|enable)$/)&&(o.select&&i.disabled(o.select)&&i.set("select",o.select,n),o.highlight&&i.disabled(o.highlight)&&i.set("highlight",o.highlight,n)),i)},n.prototype.get=function(t){return this.item[t]},n.prototype.create=function(t,n,o){var a,r=this;return n=void 0===n?t:n,n==-(1/0)||n==1/0?a=n:e.isPlainObject(n)&&i.isInteger(n.pick)?n=n.obj:e.isArray(n)?(n=new Date(n[0],n[1],n[2]),n=i.isDate(n)?n:r.create().obj):n=i.isInteger(n)||i.isDate(n)?r.normalize(new Date(n),o):r.now(t,n,o),{year:a||n.getFullYear(),month:a||n.getMonth(),date:a||n.getDate(),day:a||n.getDay(),obj:a||n,pick:a||n.getTime()}},n.prototype.createRange=function(t,n){var o=this,a=function(t){return t===!0||e.isArray(t)||i.isDate(t)?o.create(t):t};return i.isInteger(t)||(t=a(t)),i.isInteger(n)||(n=a(n)),i.isInteger(t)&&e.isPlainObject(n)?t=[n.year,n.month,n.date+t]:i.isInteger(n)&&e.isPlainObject(t)&&(n=[t.year,t.month,t.date+n]),{from:a(t),to:a(n)}},n.prototype.withinRange=function(t,e){return t=this.createRange(t.from,t.to),e.pick>=t.from.pick&&e.pick<=t.to.pick},n.prototype.overlapRanges=function(t,e){var n=this;return t=n.createRange(t.from,t.to),e=n.createRange(e.from,e.to),n.withinRange(t,e.from)||n.withinRange(t,e.to)||n.withinRange(e,t.from)||n.withinRange(e,t.to)},n.prototype.now=function(t,e,n){return e=new Date,n&&n.rel&&e.setDate(e.getDate()+n.rel),this.normalize(e,n)},n.prototype.navigate=function(t,n,i){var o,a,r,s,l=e.isArray(n),c=e.isPlainObject(n),u=this.item.view;if(l||c){for(c?(a=n.year,r=n.month,s=n.date):(a=+n[0],r=+n[1],s=+n[2]),i&&i.nav&&u&&u.month!==r&&(a=u.year,r=u.month),o=new Date(a,r+(i&&i.nav?i.nav:0),1),a=o.getFullYear(),r=o.getMonth();new Date(a,r,s).getMonth()!==r;)s-=1;n=[a,r,s]}return n},n.prototype.normalize=function(t){return t.setHours(0,0,0,0),t},n.prototype.measure=function(t,e){var n=this;return e?"string"==typeof e?e=n.parse(t,e):i.isInteger(e)&&(e=n.now(t,e,{rel:e})):e="min"==t?-(1/0):1/0,e},n.prototype.viewset=function(t,e){return this.create([e.year,e.month,1])},n.prototype.validate=function(t,n,o){var a,r,s,l,c=this,u=n,d=o&&o.interval?o.interval:1,h=c.item.enable===-1,p=c.item.min,f=c.item.max,m=h&&c.item.disable.filter(function(t){if(e.isArray(t)){var o=c.create(t).pick;o<n.pick?a=!0:o>n.pick&&(r=!0)}return i.isInteger(t)}).length;if((!o||!o.nav&&!o.defaultValue)&&(!h&&c.disabled(n)||h&&c.disabled(n)&&(m||a||r)||!h&&(n.pick<=p.pick||n.pick>=f.pick)))for(h&&!m&&(!r&&d>0||!a&&d<0)&&(d*=-1);c.disabled(n)&&(Math.abs(d)>1&&(n.month<u.month||n.month>u.month)&&(n=u,d=d>0?1:-1),n.pick<=p.pick?(s=!0,d=1,n=c.create([p.year,p.month,p.date+(n.pick===p.pick?0:-1)])):n.pick>=f.pick&&(l=!0,d=-1,n=c.create([f.year,f.month,f.date+(n.pick===f.pick?0:1)])),!s||!l);)n=c.create([n.year,n.month,n.date+d]);return n},n.prototype.disabled=function(t){var n=this,o=n.item.disable.filter(function(o){return i.isInteger(o)?t.day===(n.settings.firstDay?o:o-1)%7:e.isArray(o)||i.isDate(o)?t.pick===n.create(o).pick:e.isPlainObject(o)?n.withinRange(o,t):void 0});return o=o.length&&!o.filter(function(t){return e.isArray(t)&&"inverted"==t[3]||e.isPlainObject(t)&&t.inverted}).length,n.item.enable===-1?!o:o||t.pick<n.item.min.pick||t.pick>n.item.max.pick},n.prototype.parse=function(t,e,n){var o=this,a={};return e&&"string"==typeof e?(n&&n.format||(n=n||{},n.format=o.settings.format),o.formats.toArray(n.format).map(function(t){var n=o.formats[t],r=n?i.trigger(n,o,[e,a]):t.replace(/^!/,"").length;n&&(a[t]=e.substr(0,r)),e=e.substr(r)}),[a.yyyy||a.yy,+(a.mm||a.m)-1,a.dd||a.d]):e},n.prototype.formats=function(){function t(t,e,n){var i=t.match(/[^\x00-\x7F]+|\w+/)[0];return n.mm||n.m||(n.m=e.indexOf(i)+1),i.length}function e(t){return t.match(/\w+/)[0].length}return{d:function(t,e){return t?i.digits(t):e.date},dd:function(t,e){return t?2:i.lead(e.date)},ddd:function(t,n){return t?e(t):this.settings.weekdaysShort[n.day]},dddd:function(t,n){return t?e(t):this.settings.weekdaysFull[n.day]},m:function(t,e){return t?i.digits(t):e.month+1},mm:function(t,e){return t?2:i.lead(e.month+1)},mmm:function(e,n){var i=this.settings.monthsShort;return e?t(e,i,n):i[n.month]},mmmm:function(e,n){var i=this.settings.monthsFull;return e?t(e,i,n):i[n.month]},yy:function(t,e){return t?2:(""+e.year).slice(2)},yyyy:function(t,e){return t?4:e.year},toArray:function(t){return t.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(t,e){var n=this;return n.formats.toArray(t).map(function(t){return i.trigger(n.formats[t],n,[0,e])||t.replace(/^!/,"")}).join("")}}}(),n.prototype.isDateExact=function(t,n){var o=this;return i.isInteger(t)&&i.isInteger(n)||"boolean"==typeof t&&"boolean"==typeof n?t===n:(i.isDate(t)||e.isArray(t))&&(i.isDate(n)||e.isArray(n))?o.create(t).pick===o.create(n).pick:!(!e.isPlainObject(t)||!e.isPlainObject(n))&&(o.isDateExact(t.from,n.from)&&o.isDateExact(t.to,n.to))},n.prototype.isDateOverlap=function(t,n){var o=this,a=o.settings.firstDay?1:0;return i.isInteger(t)&&(i.isDate(n)||e.isArray(n))?(t=t%7+a)===o.create(n).day+1:i.isInteger(n)&&(i.isDate(t)||e.isArray(t))?(n=n%7+a)===o.create(t).day+1:!(!e.isPlainObject(t)||!e.isPlainObject(n))&&o.overlapRanges(t,n)},n.prototype.flipEnable=function(t){var e=this.item;e.enable=t||(e.enable==-1?1:-1)},n.prototype.deactivate=function(t,n){var o=this,a=o.item.disable.slice(0);return"flip"==n?o.flipEnable():n===!1?(o.flipEnable(1),a=[]):n===!0?(o.flipEnable(-1),a=[]):n.map(function(t){for(var n,r=0;r<a.length;r+=1)if(o.isDateExact(t,a[r])){n=!0;break}n||(i.isInteger(t)||i.isDate(t)||e.isArray(t)||e.isPlainObject(t)&&t.from&&t.to)&&a.push(t)}),a},n.prototype.activate=function(t,n){var o=this,a=o.item.disable,r=a.length;return"flip"==n?o.flipEnable():n===!0?(o.flipEnable(1),a=[]):n===!1?(o.flipEnable(-1),a=[]):n.map(function(t){var n,s,l,c;for(l=0;l<r;l+=1){if(s=a[l],o.isDateExact(s,t)){n=a[l]=null,c=!0;break}if(o.isDateOverlap(s,t)){e.isPlainObject(t)?(t.inverted=!0,n=t):e.isArray(t)?(n=t,n[3]||n.push("inverted")):i.isDate(t)&&(n=[t.getFullYear(),t.getMonth(),t.getDate(),"inverted"]);break}}if(n)for(l=0;l<r;l+=1)if(o.isDateExact(a[l],t)){a[l]=null;break}if(c)for(l=0;l<r;l+=1)if(o.isDateOverlap(a[l],t)){a[l]=null;break}n&&a.push(n)}),a.filter(function(t){return null!=t})},n.prototype.nodes=function(t){var e=this,n=e.settings,o=e.item,a=o.now,r=o.select,s=o.highlight,l=o.view,c=o.disable,u=o.min,d=o.max,h=function(t,e){return n.firstDay&&(t.push(t.shift()),e.push(e.shift())),i.node("thead",i.node("tr",i.group({min:0,max:6,i:1,node:"th",item:function(i){return[t[i],n.klass.weekdays,'scope=col title="'+e[i]+'"']}})))}((n.showWeekdaysFull?n.weekdaysFull:n.weekdaysShort).slice(0),n.weekdaysFull.slice(0)),p=function(t){return i.node("div"," ",n.klass["nav"+(t?"Next":"Prev")]+(t&&l.year>=d.year&&l.month>=d.month||!t&&l.year<=u.year&&l.month<=u.month?" "+n.klass.navDisabled:""),"data-nav="+(t||-1)+" "+i.ariaAttr({role:"button",controls:e.$node[0].id+"_table"})+' title="'+(t?n.labelMonthNext:n.labelMonthPrev)+'"')},f=function(){var o=n.showMonthsShort?n.monthsShort:n.monthsFull;return n.selectMonths?i.node("select",i.group({min:0,max:11,i:1,node:"option",item:function(t){return[o[t],0,"value="+t+(l.month==t?" selected":"")+(l.year==u.year&&t<u.month||l.year==d.year&&t>d.month?" disabled":"")]}}),n.klass.selectMonth,(t?"":"disabled")+" "+i.ariaAttr({controls:e.$node[0].id+"_table"})+' title="'+n.labelMonthSelect+'"'):i.node("div",o[l.month],n.klass.month)},m=function(){var o=l.year,a=n.selectYears===!0?5:~~(n.selectYears/2);if(a){var r=u.year,s=d.year,c=o-a,h=o+a;if(r>c&&(h+=r-c,c=r),s<h){var p=c-r,f=h-s;c-=p>f?f:p,h=s}return i.node("select",i.group({min:c,max:h,i:1,node:"option",item:function(t){return[t,0,"value="+t+(o==t?" selected":"")]}}),n.klass.selectYear,(t?"":"disabled")+" "+i.ariaAttr({controls:e.$node[0].id+"_table"})+' title="'+n.labelYearSelect+'"')}return i.node("div",o,n.klass.year)};return i.node("div",(n.selectYears?m()+f():f()+m())+p()+p(1),n.klass.header)+i.node("table",h+i.node("tbody",i.group({min:0,max:5,i:1,node:"tr",item:function(t){var o=n.firstDay&&0===e.create([l.year,l.month,1]).day?-7:0;return[i.group({min:7*t-l.day+o+1,max:function(){return this.min+7-1},i:1,node:"td",item:function(t){t=e.create([l.year,l.month,t+(n.firstDay?1:0)]);var o=r&&r.pick==t.pick,h=s&&s.pick==t.pick,p=c&&e.disabled(t)||t.pick<u.pick||t.pick>d.pick,f=i.trigger(e.formats.toString,e,[n.format,t]);return[i.node("div",t.date,function(e){return e.push(l.month==t.month?n.klass.infocus:n.klass.outfocus),a.pick==t.pick&&e.push(n.klass.now),o&&e.push(n.klass.selected),h&&e.push(n.klass.highlighted),p&&e.push(n.klass.disabled),e.join(" ")}([n.klass.day]),"data-pick="+t.pick+" "+i.ariaAttr({role:"gridcell",label:f,selected:!(!o||e.$node.val()!==f)||null,activedescendant:!!h||null,disabled:!!p||null})),"",i.ariaAttr({role:"presentation"})]}})]}})),n.klass.table,'id="'+e.$node[0].id+'_table" '+i.ariaAttr({role:"grid",controls:e.$node[0].id,readonly:!0}))+i.node("div",i.node("button",n.today,n.klass.buttonToday,"type=button data-pick="+a.pick+(t&&!e.disabled(a)?"":" disabled")+" "+i.ariaAttr({controls:e.$node[0].id}))+i.node("button",n.clear,n.klass.buttonClear,"type=button data-clear=1"+(t?"":" disabled")+" "+i.ariaAttr({controls:e.$node[0].id}))+i.node("button",n.close,n.klass.buttonClose,"type=button data-close=true "+(t?"":" disabled")+" "+i.ariaAttr({controls:e.$node[0].id})),n.klass.footer)},n.defaults=function(t){return{labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",close:"Close",closeOnSelect:!0,closeOnClear:!0,format:"d mmmm, yyyy",klass:{table:t+"table",header:t+"header",navPrev:t+"nav--prev",navNext:t+"nav--next",navDisabled:t+"nav--disabled",month:t+"month",year:t+"year",selectMonth:t+"select--month",selectYear:t+"select--year",weekdays:t+"weekday",day:t+"day",disabled:t+"day--disabled",selected:t+"day--selected",highlighted:t+"day--highlighted",now:t+"day--today",infocus:t+"day--infocus",outfocus:t+"day--outfocus",footer:t+"footer",buttonClear:t+"button--clear",buttonToday:t+"button--today",buttonClose:t+"button--close"}}}(t.klasses().picker+"__"),t.extend("pickadate",n)}),$.extend($.fn.pickadate.defaults,{selectMonths:!0,selectYears:15,onRender:function(){var t=this.$root,e=this.get("highlight","yyyy"),n=this.get("highlight","dd"),i=this.get("highlight","mmm"),o=this.get("highlight","dddd");t.find(".picker__header").prepend('<div class="picker__date-display"><div class="picker__weekday-display">'+o+'</div><div class="picker__month-display"><div>'+i+'</div></div><div class="picker__day-display"><div>'+n+'</div></div><div    class="picker__year-display"><div>'+e+"</div></div></div>")}}),function(){function t(t){return document.createElementNS(l,t)}function e(t){return(t<10?"0":"")+t}function n(t){var e=++g+"";return t?t+e:e}function i(i,r){function l(t,e){var n=d.offset(),i=/^touch/.test(t.type),o=n.left+v,a=n.top+v,l=(i?t.originalEvent.touches[0]:t).pageX-o,u=(i?t.originalEvent.touches[0]:t).pageY-a,h=Math.sqrt(l*l+u*u),m=!1;if(!e||!(h<y-x||h>y+x)){t.preventDefault();var g=setTimeout(function(){P.popover.addClass("clockpicker-moving")},200);c&&d.append(P.canvas),P.setHand(l,u,!e,!0),s.off(p).on(p,function(t){t.preventDefault();var e=/^touch/.test(t.type),n=(e?t.originalEvent.touches[0]:t).pageX-o,i=(e?t.originalEvent.touches[0]:t).pageY-a;(m||n!==l||i!==u)&&(m=!0,P.setHand(n,i,!1,!0))}),s.off(f).on(f,function(t){s.off(f),t.preventDefault();var n=/^touch/.test(t.type),i=(n?t.originalEvent.changedTouches[0]:t).pageX-o,c=(n?t.originalEvent.changedTouches[0]:t).pageY-a;(e||m)&&i===l&&c===u&&P.setHand(i,c),"hours"===P.currentView?P.toggleView("minutes",k/2):r.autoclose&&(P.minutesView.addClass("clockpicker-dial-out"),setTimeout(function(){P.done()},k/2)),d.prepend(W),clearTimeout(g),P.popover.removeClass("clockpicker-moving"),s.off(p)})}}var u=a(C),d=u.find(".clockpicker-plate"),m=u.find(".picker__holder"),g=u.find(".clockpicker-hours"),S=u.find(".clockpicker-minutes"),T=u.find(".clockpicker-am-pm-block"),M="INPUT"===i.prop("tagName"),I=M?i:i.find("input"),A=a("label[for="+I.attr("id")+"]"),P=this;if(this.id=n("cp"),this.element=i,this.holder=m,this.options=r,this.isAppended=!1,this.isShown=!1,this.currentView="hours",this.isInput=M,this.input=I,this.label=A,this.popover=u,this.plate=d,this.hoursView=g,this.minutesView=S,this.amPmBlock=T,this.spanHours=u.find(".clockpicker-span-hours"),this.spanMinutes=u.find(".clockpicker-span-minutes"),this.spanAmPm=u.find(".clockpicker-span-am-pm"),this.footer=u.find(".picker__footer"),this.amOrPm="PM",r.twelvehour){var D=['<div class="clockpicker-am-pm-block">','<button type="button" class="btn-floating btn-flat clockpicker-button clockpicker-am-button">',"AM","</button>",'<button type="button" class="btn-floating btn-flat clockpicker-button clockpicker-pm-button">',"PM","</button>","</div>"].join("");a(D);r.ampmclickable?(this.spanAmPm.empty(),a('<div id="click-am">AM</div>').on("click",function(){P.spanAmPm.children("#click-am").addClass("text-primary"),P.spanAmPm.children("#click-pm").removeClass("text-primary"),P.amOrPm="AM"}).appendTo(this.spanAmPm),a('<div id="click-pm">PM</div>').on("click",function(){P.spanAmPm.children("#click-pm").addClass("text-primary"),P.spanAmPm.children("#click-am").removeClass("text-primary"),P.amOrPm="PM"}).appendTo(this.spanAmPm)):(a('<button type="button" class="btn-floating btn-flat clockpicker-button am-button" tabindex="1">AM</button>').on("click",function(){P.amOrPm="AM",P.amPmBlock.children(".pm-button").removeClass("active"),P.amPmBlock.children(".am-button").addClass("active"),P.spanAmPm.empty().append("AM")}).appendTo(this.amPmBlock),a('<button type="button" class="btn-floating btn-flat clockpicker-button pm-button" tabindex="2">PM</button>').on("click",function(){P.amOrPm="PM",P.amPmBlock.children(".am-button").removeClass("active"),P.amPmBlock.children(".pm-button").addClass("active"),P.spanAmPm.empty().append("PM")}).appendTo(this.amPmBlock))}r.darktheme&&u.addClass("darktheme"),a('<button type="button" class="btn-flat clockpicker-button" tabindex="'+(r.twelvehour?"3":"1")+'">'+r.donetext+"</button>").click(a.proxy(this.done,this)).appendTo(this.footer),this.spanHours.click(a.proxy(this.toggleView,this,"hours")),this.spanMinutes.click(a.proxy(this.toggleView,this,"minutes")),I.on("focus.clockpicker click.clockpicker",a.proxy(this.show,this));var _,E,O,L,F=a('<div class="clockpicker-tick"></div>');if(r.twelvehour)for(_=1;_<13;_+=1)E=F.clone(),O=_/6*Math.PI,L=y,E.css("font-size","140%"),E.css({left:v+Math.sin(O)*L-x,top:v-Math.cos(O)*L-x}),E.html(0===_?"00":_),g.append(E),E.on(h,l);else for(_=0;_<24;_+=1){E=F.clone(),O=_/6*Math.PI;var R=_>0&&_<13;L=R?b:y,E.css({left:v+Math.sin(O)*L-x,top:v-Math.cos(O)*L-x}),R&&E.css("font-size","120%"),E.html(0===_?"00":_),g.append(E),E.on(h,l)}for(_=0;_<60;_+=5)E=F.clone(),O=_/30*Math.PI,E.css({left:v+Math.sin(O)*y-x,top:v-Math.cos(O)*y-x}),E.css("font-size","140%"),E.html(e(_)),S.append(E),E.on(h,l);if(d.on(h,function(t){0===a(t.target).closest(".clockpicker-tick").length&&l(t,!0)}),c){var W=u.find(".clockpicker-canvas"),V=t("svg");V.setAttribute("class","clockpicker-svg"),V.setAttribute("width",w),V.setAttribute("height",w);var z=t("g");z.setAttribute("transform","translate("+v+","+v+")");var N=t("circle");N.setAttribute("class","clockpicker-canvas-bearing"),N.setAttribute("cx",0),N.setAttribute("cy",0),N.setAttribute("r",2);var H=t("line");H.setAttribute("x1",0),H.setAttribute("y1",0);var B=t("circle");B.setAttribute("class","clockpicker-canvas-bg"),B.setAttribute("r",x);var Y=t("circle");Y.setAttribute("class","clockpicker-canvas-fg"),Y.setAttribute("r",5),z.appendChild(H),z.appendChild(B),z.appendChild(Y),z.appendChild(N),V.appendChild(z),W.append(V),this.hand=H,this.bg=B,this.fg=Y,this.bearing=N,this.g=z,this.canvas=W}o(this.options.init)}function o(t){t&&"function"==typeof t&&t()}var a=window.jQuery,r=a(window),s=a(document),l="http://www.w3.org/2000/svg",c="SVGAngle"in window&&function(){var t,e=document.createElement("div");return e.innerHTML="<svg/>",t=(e.firstChild&&e.firstChild.namespaceURI)==l,e.innerHTML="",t}(),u=function(){var t=document.createElement("div").style;return"transition"in t||"WebkitTransition"in t||"MozTransition"in t||"msTransition"in t||"OTransition"in t}(),d="ontouchstart"in window,h="mousedown"+(d?" touchstart":""),p="mousemove.clockpicker"+(d?" touchmove.clockpicker":""),f="mouseup.clockpicker"+(d?" touchend.clockpicker":""),m=navigator.vibrate?"vibrate":navigator.webkitVibrate?"webkitVibrate":null,g=0,v=135,y=110,b=80,x=20,w=2*v,k=u?350:1,C=['<div class="clockpicker picker">','<div class="picker__holder">','<div class="picker__frame">','<div class="picker__wrap">','<div class="picker__box">','<div class="picker__date-display">','<div class="clockpicker-display">','<div class="clockpicker-display-column">','<span class="clockpicker-span-hours text-primary"></span>',":",'<span class="clockpicker-span-minutes"></span>',"</div>",'<div class="clockpicker-display-column clockpicker-display-am-pm">','<div class="clockpicker-span-am-pm"></div>',"</div>","</div>","</div>",'<div class="picker__calendar-container">','<div class="clockpicker-plate">','<div class="clockpicker-canvas"></div>','<div class="clockpicker-dial clockpicker-hours"></div>','<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>',"</div>",'<div class="clockpicker-am-pm-block">',"</div>","</div>",'<div class="picker__footer">',"</div>","</div>","</div>","</div>","</div>","</div>"].join("");i.DEFAULTS={default:"",fromnow:0,donetext:"Done",autoclose:!1,ampmclickable:!1,darktheme:!1,twelvehour:!0,vibrate:!0},i.prototype.toggle=function(){this[this.isShown?"hide":"show"]()},i.prototype.locate=function(){var t=this.element,e=this.popover;t.offset(),t.outerWidth(),t.outerHeight(),this.options.align;e.show()},i.prototype.show=function(t){if(!this.isShown){o(this.options.beforeShow),a(":input").each(function(){a(this).attr("tabindex",-1)});var n=this;this.input.blur(),this.popover.addClass("picker--opened"),this.input.addClass("picker__input picker__input--active"),a(document.body).css("overflow","hidden"),this.isAppended||(this.popover.insertAfter(this.input),this.options.twelvehour&&(this.amOrPm="PM",this.options.ampmclickable?(this.spanAmPm.children("#click-pm").addClass("text-primary"),this.spanAmPm.children("#click-am").removeClass("text-primary")):(this.amPmBlock.children(".am-button").removeClass("active"),this.amPmBlock.children(".pm-button").addClass("active"),this.spanAmPm.empty().append("PM"))),r.on("resize.clockpicker"+this.id,function(){n.isShown&&n.locate()}),this.isAppended=!0);var i=((this.input.prop("value")||this.options.default||"")+"").split(":");if(this.options.twelvehour&&void 0!==i[1]&&(i[1]=i[1].replace("AM","").replace("PM","")),"now"===i[0]){var l=new Date(+new Date+this.options.fromnow);i=[l.getHours(),l.getMinutes()]}this.hours=+i[0]||0,this.minutes=+i[1]||0,this.spanHours.html(e(this.hours)),this.spanMinutes.html(e(this.minutes)),this.toggleView("hours"),this.locate(),this.isShown=!0,s.on("click.clockpicker."+this.id+" focusin.clockpicker."+this.id,function(t){var e=a(t.target);0===e.closest(n.popover.find(".picker__wrap")).length&&0===e.closest(n.input).length&&n.hide()}),s.on("keyup.clockpicker."+this.id,function(t){27===t.keyCode&&n.hide()}),o(this.options.afterShow)}},i.prototype.hide=function(){o(this.options.beforeHide),this.input.removeClass("picker__input picker__input--active"),this.popover.removeClass("picker--opened"),a(document.body).css("overflow","visible"),this.isShown=!1,a(":input").each(function(t){a(this).attr("tabindex",t+1)}),s.off("click.clockpicker."+this.id+" focusin.clockpicker."+this.id),s.off("keyup.clockpicker."+this.id),this.popover.hide(),o(this.options.afterHide)},i.prototype.toggleView=function(t,e){var n=!1;"minutes"===t&&"visible"===a(this.hoursView).css("visibility")&&(o(this.options.beforeHourSelect),n=!0);var i="hours"===t,r=i?this.hoursView:this.minutesView,s=i?this.minutesView:this.hoursView;this.currentView=t,this.spanHours.toggleClass("text-primary",i),this.spanMinutes.toggleClass("text-primary",!i),s.addClass("clockpicker-dial-out"),r.css("visibility","visible").removeClass("clockpicker-dial-out"),this.resetClock(e),clearTimeout(this.toggleViewTimer),this.toggleViewTimer=setTimeout(function(){s.css("visibility","hidden")},k),n&&o(this.options.afterHourSelect)},i.prototype.resetClock=function(t){var e=this.currentView,n=this[e],i="hours"===e,o=Math.PI/(i?6:30),a=n*o,r=i&&n>0&&n<13?b:y,s=Math.sin(a)*r,l=-Math.cos(a)*r,u=this;c&&t?(u.canvas.addClass("clockpicker-canvas-out"),setTimeout(function(){u.canvas.removeClass("clockpicker-canvas-out"),u.setHand(s,l)},t)):this.setHand(s,l)},i.prototype.setHand=function(t,n,i,o){var r,s=Math.atan2(t,-n),l="hours"===this.currentView,u=Math.PI/(l||i?6:30),d=Math.sqrt(t*t+n*n),h=this.options,p=l&&d<(y+b)/2,f=p?b:y;if(h.twelvehour&&(f=y),s<0&&(s=2*Math.PI+s),r=Math.round(s/u),s=r*u,h.twelvehour?l?0===r&&(r=12):(i&&(r*=5),60===r&&(r=0)):l?(12===r&&(r=0),r=p?0===r?12:r:0===r?0:r+12):(i&&(r*=5),60===r&&(r=0)),l?this.fg.setAttribute("class","clockpicker-canvas-fg"):r%5==0?this.fg.setAttribute("class","clockpicker-canvas-fg"):this.fg.setAttribute("class","clockpicker-canvas-fg active"),this[this.currentView]!==r&&m&&this.options.vibrate&&(this.vibrateTimer||(navigator[m](10),this.vibrateTimer=setTimeout(a.proxy(function(){this.vibrateTimer=null},this),100))),this[this.currentView]=r,this[l?"spanHours":"spanMinutes"].html(e(r)),!c)return void this[l?"hoursView":"minutesView"].find(".clockpicker-tick").each(function(){var t=a(this);t.toggleClass("active",r===+t.html())});o||!l&&r%5?(this.g.insertBefore(this.hand,this.bearing),this.g.insertBefore(this.bg,this.fg),this.bg.setAttribute("class","clockpicker-canvas-bg clockpicker-canvas-bg-trans")):(this.g.insertBefore(this.hand,this.bg),this.g.insertBefore(this.fg,this.bg),this.bg.setAttribute("class","clockpicker-canvas-bg"));var g=Math.sin(s)*(f-x),v=-Math.cos(s)*(f-x),w=Math.sin(s)*f,k=-Math.cos(s)*f;this.hand.setAttribute("x2",g),this.hand.setAttribute("y2",v),this.bg.setAttribute("cx",w),this.bg.setAttribute("cy",k),this.fg.setAttribute("cx",w),this.fg.setAttribute("cy",k)},i.prototype.done=function(){o(this.options.beforeDone),this.hide(),this.label.addClass("active");var t=this.input.prop("value"),n=e(this.hours)+":"+e(this.minutes);this.options.twelvehour&&(n+=this.amOrPm),this.input.prop("value",n),n!==t&&(this.input.triggerHandler("change"),this.isInput||this.element.trigger("change")),this.options.autoclose&&this.input.trigger("blur"),
o(this.options.afterDone)},i.prototype.remove=function(){this.element.removeData("clockpicker"),this.input.off("focus.clockpicker click.clockpicker"),this.isShown&&this.hide(),this.isAppended&&(r.off("resize.clockpicker"+this.id),this.popover.remove())},a.fn.pickatime=function(t){var e=Array.prototype.slice.call(arguments,1);return this.each(function(){var n=a(this),o=n.data("clockpicker");if(o)"function"==typeof o[t]&&o[t].apply(o,e);else{var r=a.extend({},i.DEFAULTS,n.data(),"object"==typeof t&&t);n.data("clockpicker",new i(n,r))}})}}(),function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.PhotoSwipe=e()}(this,function(){"use strict";return function(t,e,n,i){var o={features:null,bind:function(t,e,n,i){var o=(i?"remove":"add")+"EventListener";e=e.split(" ");for(var a=0;a<e.length;a++)e[a]&&t[o](e[a],n,!1)},isArray:function(t){return t instanceof Array},createEl:function(t,e){var n=document.createElement(e||"div");return t&&(n.className=t),n},getScrollY:function(){var t=window.pageYOffset;return void 0!==t?t:document.documentElement.scrollTop},unbind:function(t,e,n){o.bind(t,e,n,!0)},removeClass:function(t,e){var n=new RegExp("(\\s|^)"+e+"(\\s|$)");t.className=t.className.replace(n," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(t,e){o.hasClass(t,e)||(t.className+=(t.className?" ":"")+e)},hasClass:function(t,e){return t.className&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(t.className)},getChildByClass:function(t,e){for(var n=t.firstChild;n;){if(o.hasClass(n,e))return n;n=n.nextSibling}},arraySearch:function(t,e,n){for(var i=t.length;i--;)if(t[i][n]===e)return i;return-1},extend:function(t,e,n){for(var i in e)if(e.hasOwnProperty(i)){if(n&&t.hasOwnProperty(i))continue;t[i]=e[i]}},easing:{sine:{out:function(t){return Math.sin(t*(Math.PI/2))},inOut:function(t){return-(Math.cos(Math.PI*t)-1)/2}},cubic:{out:function(t){return--t*t*t+1}}},detectFeatures:function(){if(o.features)return o.features;var t=o.createEl(),e=t.style,n="",i={};if(i.oldIE=document.all&&!document.addEventListener,i.touch="ontouchstart"in window,window.requestAnimationFrame&&(i.raf=window.requestAnimationFrame,i.caf=window.cancelAnimationFrame),i.pointerEvent=navigator.pointerEnabled||navigator.msPointerEnabled,!i.pointerEvent){var a=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var r=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);r&&r.length>0&&(r=parseInt(r[1],10))>=1&&8>r&&(i.isOldIOSPhone=!0)}var s=a.match(/Android\s([0-9\.]*)/),l=s?s[1]:0;l=parseFloat(l),l>=1&&(4.4>l&&(i.isOldAndroid=!0),i.androidVersion=l),i.isMobileOpera=/opera mini|opera mobi/i.test(a)}for(var c,u,d=["transform","perspective","animationName"],h=["","webkit","Moz","ms","O"],p=0;4>p;p++){n=h[p];for(var f=0;3>f;f++)c=d[f],u=n+(n?c.charAt(0).toUpperCase()+c.slice(1):c),!i[c]&&u in e&&(i[c]=u);n&&!i.raf&&(n=n.toLowerCase(),i.raf=window[n+"RequestAnimationFrame"],i.raf&&(i.caf=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]))}if(!i.raf){var m=0;i.raf=function(t){var e=(new Date).getTime(),n=Math.max(0,16-(e-m)),i=window.setTimeout(function(){t(e+n)},n);return m=e+n,i},i.caf=function(t){clearTimeout(t)}}return i.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,o.features=i,i}};o.detectFeatures(),o.features.oldIE&&(o.bind=function(t,e,n,i){e=e.split(" ");for(var o,a=(i?"detach":"attach")+"Event",r=function(){n.handleEvent.call(n)},s=0;s<e.length;s++)if(o=e[s])if("object"==typeof n&&n.handleEvent){if(i){if(!n["oldIE"+o])return!1}else n["oldIE"+o]=r;t[a]("on"+o,n["oldIE"+o])}else t[a]("on"+o,n)});var a=this,r={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(t){return"A"===t.tagName},getDoubleTapZoom:function(t,e){return t?1:e.initialZoomLevel<.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};o.extend(r,i);var s,l,c,u,d,h,p,f,m,g,v,y,b,x,w,k,C,S,T,M,I,A,P,D,_,E,O,L,F,R,W,V,z,N,H,B,Y,j,$,X,q,U,Q,Z,G,K,J,tt,et,nt,it,ot,at,rt,st,lt,ct=function(){return{x:0,y:0}},ut=ct(),dt=ct(),ht=ct(),pt={},ft=0,mt={},gt=ct(),vt=0,yt=!0,bt=[],xt={},wt=!1,kt=function(t,e){o.extend(a,e.publicMethods),bt.push(t)},Ct=function(t){var e=Qe();return t>e-1?t-e:0>t?e+t:t},St={},Tt=function(t,e){return St[t]||(St[t]=[]),St[t].push(e)},Mt=function(t){var e=St[t];if(e){var n=Array.prototype.slice.call(arguments);n.shift();for(var i=0;i<e.length;i++)e[i].apply(a,n)}},It=function(){return(new Date).getTime()},At=function(t){rt=t,a.bg.style.opacity=t*r.bgOpacity},Pt=function(t,e,n,i,o){(!wt||o&&o!==a.currItem)&&(i/=o?o.fitRatio:a.currItem.fitRatio),t[A]=y+e+"px, "+n+"px"+b+" scale("+i+")"},Dt=function(t){et&&(t&&(g>a.currItem.fitRatio?wt||(ln(a.currItem,!1,!0),wt=!0):wt&&(ln(a.currItem),wt=!1)),Pt(et,ht.x,ht.y,g))},_t=function(t){t.container&&Pt(t.container.style,t.initialPosition.x,t.initialPosition.y,t.initialZoomLevel,t)},Et=function(t,e){e[A]=y+t+"px, 0px"+b},Ot=function(t,e){if(!r.loop&&e){var n=u+(gt.x*ft-t)/gt.x,i=Math.round(t-fe.x);(0>n&&i>0||n>=Qe()-1&&0>i)&&(t=fe.x+i*r.mainScrollEndFriction)}fe.x=t,Et(t,d)},Lt=function(t,e){var n=me[t]-mt[t];return dt[t]+ut[t]+n-n*(e/v)},Ft=function(t,e){t.x=e.x,t.y=e.y,e.id&&(t.id=e.id)},Rt=function(t){t.x=Math.round(t.x),t.y=Math.round(t.y)},Wt=null,Vt=function(){Wt&&(o.unbind(document,"mousemove",Vt),o.addClass(t,"pswp--has_mouse"),r.mouseUsed=!0,Mt("mouseUsed")),Wt=setTimeout(function(){Wt=null},100)},zt=function(){o.bind(document,"keydown",a),W.transform&&o.bind(a.scrollWrap,"click",a),r.mouseUsed||o.bind(document,"mousemove",Vt),o.bind(window,"resize scroll",a),Mt("bindEvents")},Nt=function(){o.unbind(window,"resize",a),o.unbind(window,"scroll",m.scroll),o.unbind(document,"keydown",a),o.unbind(document,"mousemove",Vt),W.transform&&o.unbind(a.scrollWrap,"click",a),j&&o.unbind(window,p,a),Mt("unbindEvents")},Ht=function(t,e){var n=on(a.currItem,pt,t);return e&&(tt=n),n},Bt=function(t){return t||(t=a.currItem),t.initialZoomLevel},Yt=function(t){return t||(t=a.currItem),t.w>0?r.maxSpreadZoom:1},jt=function(t,e,n,i){return i===a.currItem.initialZoomLevel?(n[t]=a.currItem.initialPosition[t],!0):(n[t]=Lt(t,i),n[t]>e.min[t]?(n[t]=e.min[t],!0):n[t]<e.max[t]&&(n[t]=e.max[t],!0))},$t=function(){if(A){return y="translate"+(W.perspective&&!D?"3d(":"("),void(b=W.perspective?", 0px)":")")}A="left",o.addClass(t,"pswp--ie"),Et=function(t,e){e.left=t+"px"},_t=function(t){var e=t.fitRatio>1?1:t.fitRatio,n=t.container.style,i=e*t.w,o=e*t.h;n.width=i+"px",n.height=o+"px",n.left=t.initialPosition.x+"px",n.top=t.initialPosition.y+"px"},Dt=function(){if(et){var t=et,e=a.currItem,n=e.fitRatio>1?1:e.fitRatio,i=n*e.w,o=n*e.h;t.width=i+"px",t.height=o+"px",t.left=ht.x+"px",t.top=ht.y+"px"}}},Xt=function(t){var e="";r.escKey&&27===t.keyCode?e="close":r.arrowKeys&&(37===t.keyCode?e="prev":39===t.keyCode&&(e="next")),e&&(t.ctrlKey||t.altKey||t.shiftKey||t.metaKey||(t.preventDefault?t.preventDefault():t.returnValue=!1,a[e]()))},qt=function(t){t&&(q||X||nt||B)&&(t.preventDefault(),t.stopPropagation())},Ut=function(){a.setScrollOffset(0,o.getScrollY())},Qt={},Zt=0,Gt=function(t){Qt[t]&&(Qt[t].raf&&E(Qt[t].raf),Zt--,delete Qt[t])},Kt=function(t){Qt[t]&&Gt(t),Qt[t]||(Zt++,Qt[t]={})},Jt=function(){for(var t in Qt)Qt.hasOwnProperty(t)&&Gt(t)},te=function(t,e,n,i,o,a,r){var s,l=It();Kt(t);var c=function(){if(Qt[t]){if((s=It()-l)>=i)return Gt(t),a(n),void(r&&r());a((n-e)*o(s/i)+e),Qt[t].raf=_(c)}};c()},ee={shout:Mt,listen:Tt,viewportSize:pt,options:r,isMainScrollAnimating:function(){return nt},getZoomLevel:function(){return g},getCurrentIndex:function(){return u},isDragging:function(){return j},isZooming:function(){return G},setScrollOffset:function(t,e){mt.x=t,R=mt.y=e,Mt("updateScrollOffset",mt)},applyZoomPan:function(t,e,n,i){ht.x=e,ht.y=n,g=t,Dt(i)},init:function(){if(!s&&!l){var n;a.framework=o,a.template=t,a.bg=o.getChildByClass(t,"pswp__bg"),O=t.className,s=!0,W=o.detectFeatures(),_=W.raf,E=W.caf,A=W.transform,F=W.oldIE,a.scrollWrap=o.getChildByClass(t,"pswp__scroll-wrap"),a.container=o.getChildByClass(a.scrollWrap,"pswp__container"),d=a.container.style,a.itemHolders=k=[{el:a.container.children[0],wrap:0,index:-1},{el:a.container.children[1],wrap:0,index:-1},{el:a.container.children[2],wrap:0,index:-1}],k[0].el.style.display=k[2].el.style.display="none",$t(),m={resize:a.updateSize,scroll:Ut,keydown:Xt,click:qt};var i=W.isOldIOSPhone||W.isOldAndroid||W.isMobileOpera;for(W.animationName&&W.transform&&!i||(r.showAnimationDuration=r.hideAnimationDuration=0),n=0;n<bt.length;n++)a["init"+bt[n]]();if(e){(a.ui=new e(a,o)).init()}Mt("firstUpdate"),u=u||r.index||0,(isNaN(u)||0>u||u>=Qe())&&(u=0),a.currItem=Ue(u),(W.isOldIOSPhone||W.isOldAndroid)&&(yt=!1),t.setAttribute("aria-hidden","false"),r.modal&&(yt?t.style.position="fixed":(t.style.position="absolute",t.style.top=o.getScrollY()+"px")),void 0===R&&(Mt("initialLayout"),R=L=o.getScrollY());var c="pswp--open ";for(r.mainClass&&(c+=r.mainClass+" "),r.showHideOpacity&&(c+="pswp--animate_opacity "),c+=D?"pswp--touch":"pswp--notouch",c+=W.animationName?" pswp--css_animation":"",c+=W.svg?" pswp--svg":"",o.addClass(t,c),a.updateSize(),h=-1,vt=null,n=0;3>n;n++)Et((n+h)*gt.x,k[n].el.style);F||o.bind(a.scrollWrap,f,a),Tt("initialZoomInEnd",function(){a.setContent(k[0],u-1),a.setContent(k[2],u+1),k[0].el.style.display=k[2].el.style.display="block",r.focus&&t.focus(),zt()}),a.setContent(k[1],u),a.updateCurrItem(),Mt("afterInit"),yt||(x=setInterval(function(){Zt||j||G||g!==a.currItem.initialZoomLevel||a.updateSize()},1e3)),o.addClass(t,"pswp--visible")}},close:function(){s&&(s=!1,l=!0,Mt("close"),Nt(),Ge(a.currItem,null,!0,a.destroy))},destroy:function(){Mt("destroy"),je&&clearTimeout(je),t.setAttribute("aria-hidden","true"),t.className=O,x&&clearInterval(x),o.unbind(a.scrollWrap,f,a),o.unbind(window,"scroll",a),xe(),Jt(),St=null},panTo:function(t,e,n){n||(t>tt.min.x?t=tt.min.x:t<tt.max.x&&(t=tt.max.x),e>tt.min.y?e=tt.min.y:e<tt.max.y&&(e=tt.max.y)),ht.x=t,ht.y=e,Dt()},handleEvent:function(t){t=t||window.event,m[t.type]&&m[t.type](t)},goTo:function(t){t=Ct(t);var e=t-u;vt=e,u=t,a.currItem=Ue(u),ft-=e,Ot(gt.x*ft),Jt(),nt=!1,a.updateCurrItem()},next:function(){a.goTo(u+1)},prev:function(){a.goTo(u-1)},updateCurrZoomItem:function(t){if(t&&Mt("beforeChange",0),k[1].el.children.length){var e=k[1].el.children[0];et=o.hasClass(e,"pswp__zoom-wrap")?e.style:null}else et=null;tt=a.currItem.bounds,v=g=a.currItem.initialZoomLevel,ht.x=tt.center.x,ht.y=tt.center.y,t&&Mt("afterChange")},invalidateCurrItems:function(){w=!0;for(var t=0;3>t;t++)k[t].item&&(k[t].item.needsUpdate=!0)},updateCurrItem:function(t){if(0!==vt){var e,n=Math.abs(vt);if(!(t&&2>n)){a.currItem=Ue(u),wt=!1,Mt("beforeChange",vt),n>=3&&(h+=vt+(vt>0?-3:3),n=3);for(var i=0;n>i;i++)vt>0?(e=k.shift(),k[2]=e,h++,Et((h+2)*gt.x,e.el.style),a.setContent(e,u-n+i+1+1)):(e=k.pop(),k.unshift(e),h--,Et(h*gt.x,e.el.style),a.setContent(e,u+n-i-1-1));if(et&&1===Math.abs(vt)){var o=Ue(C);o.initialZoomLevel!==g&&(on(o,pt),ln(o),_t(o))}vt=0,a.updateCurrZoomItem(),C=u,Mt("afterChange")}}},updateSize:function(e){if(!yt&&r.modal){var n=o.getScrollY();if(R!==n&&(t.style.top=n+"px",R=n),!e&&xt.x===window.innerWidth&&xt.y===window.innerHeight)return;xt.x=window.innerWidth,xt.y=window.innerHeight,t.style.height=xt.y+"px"}if(pt.x=a.scrollWrap.clientWidth,pt.y=a.scrollWrap.clientHeight,Ut(),gt.x=pt.x+Math.round(pt.x*r.spacing),gt.y=pt.y,Ot(gt.x*ft),Mt("beforeResize"),void 0!==h){for(var i,s,l,c=0;3>c;c++)i=k[c],Et((c+h)*gt.x,i.el.style),l=u+c-1,r.loop&&Qe()>2&&(l=Ct(l)),s=Ue(l),s&&(w||s.needsUpdate||!s.bounds)?(a.cleanSlide(s),a.setContent(i,l),1===c&&(a.currItem=s,a.updateCurrZoomItem(!0)),s.needsUpdate=!1):-1===i.index&&l>=0&&a.setContent(i,l),s&&s.container&&(on(s,pt),ln(s),_t(s));w=!1}v=g=a.currItem.initialZoomLevel,tt=a.currItem.bounds,tt&&(ht.x=tt.center.x,ht.y=tt.center.y,Dt(!0)),Mt("resize")},zoomTo:function(t,e,n,i,a){e&&(v=g,me.x=Math.abs(e.x)-ht.x,me.y=Math.abs(e.y)-ht.y,Ft(dt,ht));var r=Ht(t,!1),s={};jt("x",r,s,t),jt("y",r,s,t);var l=g,c={x:ht.x,y:ht.y};Rt(s);var u=function(e){1===e?(g=t,ht.x=s.x,ht.y=s.y):(g=(t-l)*e+l,ht.x=(s.x-c.x)*e+c.x,ht.y=(s.y-c.y)*e+c.y),a&&a(e),Dt(1===e)};n?te("customZoomTo",0,1,n,i||o.easing.sine.inOut,u):u(1)}},ne={},ie={},oe={},ae={},re={},se=[],le={},ce=[],ue={},de=0,he=ct(),pe=0,fe=ct(),me=ct(),ge=ct(),ve=function(t,e){return t.x===e.x&&t.y===e.y},ye=function(t,e){return Math.abs(t.x-e.x)<25&&Math.abs(t.y-e.y)<25},be=function(t,e){return ue.x=Math.abs(t.x-e.x),ue.y=Math.abs(t.y-e.y),Math.sqrt(ue.x*ue.x+ue.y*ue.y)},xe=function(){U&&(E(U),U=null)},we=function(){j&&(U=_(we),We())},ke=function(){return!("fit"===r.scaleMode&&g===a.currItem.initialZoomLevel)},Ce=function(t,e){return!(!t||t===document)&&(!(t.getAttribute("class")&&t.getAttribute("class").indexOf("pswp__scroll-wrap")>-1)&&(e(t)?t:Ce(t.parentNode,e)))},Se={},Te=function(t,e){return Se.prevent=!Ce(t.target,r.isClickableElement),Mt("preventDragEvent",t,e,Se),Se.prevent},Me=function(t,e){return e.x=t.pageX,e.y=t.pageY,e.id=t.identifier,e},Ie=function(t,e,n){n.x=.5*(t.x+e.x),n.y=.5*(t.y+e.y)},Ae=function(t,e,n){if(t-z>50){var i=ce.length>2?ce.shift():{};i.x=e,i.y=n,ce.push(i),z=t}},Pe=function(){var t=ht.y-a.currItem.initialPosition.y;return 1-Math.abs(t/(pt.y/2))},De={},_e={},Ee=[],Oe=function(t){for(;Ee.length>0;)Ee.pop();return P?(lt=0,se.forEach(function(t){0===lt?Ee[0]=t:1===lt&&(Ee[1]=t),lt++})):t.type.indexOf("touch")>-1?t.touches&&t.touches.length>0&&(Ee[0]=Me(t.touches[0],De),t.touches.length>1&&(Ee[1]=Me(t.touches[1],_e))):(De.x=t.pageX,De.y=t.pageY,De.id="",Ee[0]=De),Ee},Le=function(t,e){var n,i,o,s,l=ht[t]+e[t],c=e[t]>0,u=fe.x+e.x,d=fe.x-le.x;return n=l>tt.min[t]||l<tt.max[t]?r.panEndFriction:1,l=ht[t]+e[t]*n,!r.allowPanToNext&&g!==a.currItem.initialZoomLevel||(et?"h"!==it||"x"!==t||X||(c?(l>tt.min[t]&&(n=r.panEndFriction,tt.min[t]-l,i=tt.min[t]-dt[t]),(0>=i||0>d)&&Qe()>1?(s=u,0>d&&u>le.x&&(s=le.x)):tt.min.x!==tt.max.x&&(o=l)):(l<tt.max[t]&&(n=r.panEndFriction,l-tt.max[t],i=dt[t]-tt.max[t]),(0>=i||d>0)&&Qe()>1?(s=u,d>0&&u<le.x&&(s=le.x)):tt.min.x!==tt.max.x&&(o=l))):s=u,"x"!==t)?void(nt||Q||g>a.currItem.fitRatio&&(ht[t]+=e[t]*n)):(void 0!==s&&(Ot(s,!0),Q=s!==le.x),tt.min.x!==tt.max.x&&(void 0!==o?ht.x=o:Q||(ht.x+=e.x*n)),void 0!==s)},Fe=function(t){if(!("mousedown"===t.type&&t.button>0)){if(qe)return void t.preventDefault();if(!Y||"mousedown"!==t.type){if(Te(t,!0)&&t.preventDefault(),Mt("pointerDown"),P){var e=o.arraySearch(se,t.pointerId,"id");0>e&&(e=se.length),se[e]={x:t.pageX,y:t.pageY,id:t.pointerId}}var n=Oe(t),i=n.length;Z=null,Jt(),j&&1!==i||(j=ot=!0,o.bind(window,p,a),H=st=at=B=Q=q=$=X=!1,it=null,Mt("firstTouchStart",n),Ft(dt,ht),ut.x=ut.y=0,Ft(ae,n[0]),Ft(re,ae),le.x=gt.x*ft,ce=[{x:ae.x,y:ae.y}],z=V=It(),Ht(g,!0),xe(),we()),!G&&i>1&&!nt&&!Q&&(v=g,X=!1,G=$=!0,ut.y=ut.x=0,Ft(dt,ht),Ft(ne,n[0]),Ft(ie,n[1]),Ie(ne,ie,ge),me.x=Math.abs(ge.x)-ht.x,me.y=Math.abs(ge.y)-ht.y,K=J=be(ne,ie))}}},Re=function(t){if(t.preventDefault(),P){var e=o.arraySearch(se,t.pointerId,"id");if(e>-1){var n=se[e];n.x=t.pageX,n.y=t.pageY}}if(j){var i=Oe(t);if(it||q||G)Z=i;else if(fe.x!==gt.x*ft)it="h";else{var a=Math.abs(i[0].x-ae.x)-Math.abs(i[0].y-ae.y);Math.abs(a)>=10&&(it=a>0?"h":"v",Z=i)}}},We=function(){if(Z){var t=Z.length;if(0!==t)if(Ft(ne,Z[0]),oe.x=ne.x-ae.x,oe.y=ne.y-ae.y,G&&t>1){if(ae.x=ne.x,ae.y=ne.y,!oe.x&&!oe.y&&ve(Z[1],ie))return;Ft(ie,Z[1]),X||(X=!0,Mt("zoomGestureStarted"));var e=be(ne,ie),n=Be(e);n>a.currItem.initialZoomLevel+a.currItem.initialZoomLevel/15&&(st=!0);var i=1,o=Bt(),s=Yt();if(o>n)if(r.pinchToClose&&!st&&v<=a.currItem.initialZoomLevel){var l=o-n,c=1-l/(o/1.2);At(c),Mt("onPinchClose",c),at=!0}else i=(o-n)/o,i>1&&(i=1),n=o-i*(o/3);else n>s&&(i=(n-s)/(6*o),i>1&&(i=1),n=s+i*o);0>i&&(i=0),K=e,Ie(ne,ie,he),ut.x+=he.x-ge.x,ut.y+=he.y-ge.y,Ft(ge,he),ht.x=Lt("x",n),ht.y=Lt("y",n),H=n>g,g=n,Dt()}else{if(!it)return;if(ot&&(ot=!1,Math.abs(oe.x)>=10&&(oe.x-=Z[0].x-re.x),Math.abs(oe.y)>=10&&(oe.y-=Z[0].y-re.y)),ae.x=ne.x,ae.y=ne.y,0===oe.x&&0===oe.y)return;if("v"===it&&r.closeOnVerticalDrag&&!ke()){ut.y+=oe.y,ht.y+=oe.y;var u=Pe();return B=!0,Mt("onVerticalDrag",u),At(u),void Dt()}Ae(It(),ne.x,ne.y),q=!0,tt=a.currItem.bounds;var d=Le("x",oe);d||(Le("y",oe),Rt(ht),Dt())}}},Ve=function(t){if(W.isOldAndroid){if(Y&&"mouseup"===t.type)return;t.type.indexOf("touch")>-1&&(clearTimeout(Y),Y=setTimeout(function(){Y=0},600))}Mt("pointerUp"),Te(t,!1)&&t.preventDefault();var e;if(P){var n=o.arraySearch(se,t.pointerId,"id");if(n>-1)if(e=se.splice(n,1)[0],navigator.pointerEnabled)e.type=t.pointerType||"mouse";else{var i={4:"mouse",2:"touch",3:"pen"};e.type=i[t.pointerType],e.type||(e.type=t.pointerType||"mouse")}}var s,l=Oe(t),c=l.length;if("mouseup"===t.type&&(c=0),2===c)return Z=null,!0;1===c&&Ft(re,l[0]),0!==c||it||nt||(e||("mouseup"===t.type?e={x:t.pageX,y:t.pageY,type:"mouse"}:t.changedTouches&&t.changedTouches[0]&&(e={x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY,type:"touch"})),Mt("touchRelease",t,e));var u=-1;if(0===c&&(j=!1,o.unbind(window,p,a),xe(),G?u=0:-1!==pe&&(u=It()-pe)),pe=1===c?It():-1,s=-1!==u&&150>u?"zoom":"swipe",G&&2>c&&(G=!1,1===c&&(s="zoomPointerUp"),Mt("zoomGestureEnded")),Z=null,q||X||nt||B)if(Jt(),N||(N=ze()),N.calculateSwipeSpeed("x"),B){var d=Pe();if(d<r.verticalDragRange)a.close();else{var h=ht.y,f=rt;te("verticalDrag",0,1,300,o.easing.cubic.out,function(t){ht.y=(a.currItem.initialPosition.y-h)*t+h,At((1-f)*t+f),Dt()}),Mt("onVerticalDrag",1)}}else{if((Q||nt)&&0===c){var m=He(s,N);if(m)return;s="zoomPointerUp"}if(!nt)return"swipe"!==s?void Ye():void(!Q&&g>a.currItem.fitRatio&&Ne(N))}},ze=function(){var t,e,n={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(i){ce.length>1?(t=It()-z+50,e=ce[ce.length-2][i]):(t=It()-V,e=re[i]),n.lastFlickOffset[i]=ae[i]-e,n.lastFlickDist[i]=Math.abs(n.lastFlickOffset[i]),n.lastFlickDist[i]>20?n.lastFlickSpeed[i]=n.lastFlickOffset[i]/t:n.lastFlickSpeed[i]=0,Math.abs(n.lastFlickSpeed[i])<.1&&(n.lastFlickSpeed[i]=0),n.slowDownRatio[i]=.95,n.slowDownRatioReverse[i]=1-n.slowDownRatio[i],n.speedDecelerationRatio[i]=1},calculateOverBoundsAnimOffset:function(t,e){n.backAnimStarted[t]||(ht[t]>tt.min[t]?n.backAnimDestination[t]=tt.min[t]:ht[t]<tt.max[t]&&(n.backAnimDestination[t]=tt.max[t]),void 0!==n.backAnimDestination[t]&&(n.slowDownRatio[t]=.7,n.slowDownRatioReverse[t]=1-n.slowDownRatio[t],n.speedDecelerationRatioAbs[t]<.05&&(n.lastFlickSpeed[t]=0,n.backAnimStarted[t]=!0,te("bounceZoomPan"+t,ht[t],n.backAnimDestination[t],e||300,o.easing.sine.out,function(e){ht[t]=e,Dt()}))))},calculateAnimOffset:function(t){n.backAnimStarted[t]||(n.speedDecelerationRatio[t]=n.speedDecelerationRatio[t]*(n.slowDownRatio[t]+n.slowDownRatioReverse[t]-n.slowDownRatioReverse[t]*n.timeDiff/10),n.speedDecelerationRatioAbs[t]=Math.abs(n.lastFlickSpeed[t]*n.speedDecelerationRatio[t]),n.distanceOffset[t]=n.lastFlickSpeed[t]*n.speedDecelerationRatio[t]*n.timeDiff,ht[t]+=n.distanceOffset[t])},panAnimLoop:function(){return Qt.zoomPan&&(Qt.zoomPan.raf=_(n.panAnimLoop),n.now=It(),n.timeDiff=n.now-n.lastNow,n.lastNow=n.now,n.calculateAnimOffset("x"),n.calculateAnimOffset("y"),Dt(),n.calculateOverBoundsAnimOffset("x"),n.calculateOverBoundsAnimOffset("y"),n.speedDecelerationRatioAbs.x<.05&&n.speedDecelerationRatioAbs.y<.05)?(ht.x=Math.round(ht.x),ht.y=Math.round(ht.y),Dt(),void Gt("zoomPan")):void 0}};return n},Ne=function(t){return t.calculateSwipeSpeed("y"),tt=a.currItem.bounds,t.backAnimDestination={},t.backAnimStarted={},Math.abs(t.lastFlickSpeed.x)<=.05&&Math.abs(t.lastFlickSpeed.y)<=.05?(t.speedDecelerationRatioAbs.x=t.speedDecelerationRatioAbs.y=0,t.calculateOverBoundsAnimOffset("x"),t.calculateOverBoundsAnimOffset("y"),!0):(Kt("zoomPan"),t.lastNow=It(),void t.panAnimLoop())},He=function(t,e){var n;nt||(de=u);var i;if("swipe"===t){var s=ae.x-re.x,l=e.lastFlickDist.x<10;s>30&&(l||e.lastFlickOffset.x>20)?i=-1:-30>s&&(l||e.lastFlickOffset.x<-20)&&(i=1)}var c;i&&(u+=i,0>u?(u=r.loop?Qe()-1:0,c=!0):u>=Qe()&&(u=r.loop?0:Qe()-1,c=!0),(!c||r.loop)&&(vt+=i,ft-=i,n=!0));var d,h=gt.x*ft,p=Math.abs(h-fe.x);return n||h>fe.x==e.lastFlickSpeed.x>0?(d=Math.abs(e.lastFlickSpeed.x)>0?p/Math.abs(e.lastFlickSpeed.x):333,d=Math.min(d,400),d=Math.max(d,250)):d=333,de===u&&(n=!1),nt=!0,Mt("mainScrollAnimStart"),te("mainScroll",fe.x,h,d,o.easing.cubic.out,Ot,function(){Jt(),nt=!1,de=-1,(n||de!==u)&&a.updateCurrItem(),Mt("mainScrollAnimComplete")}),n&&a.updateCurrItem(!0),n},Be=function(t){return 1/J*t*v},Ye=function(){var t=g,e=Bt(),n=Yt();e>g?t=e:g>n&&(t=n);var i,r=rt;return at&&!H&&!st&&e>g?(a.close(),!0):(at&&(i=function(t){At((1-r)*t+r)}),a.zoomTo(t,0,200,o.easing.cubic.out,i),!0)};kt("Gestures",{publicMethods:{initGestures:function(){var t=function(t,e,n,i,o){S=t+e,T=t+n,M=t+i,I=o?t+o:""};P=W.pointerEvent,P&&W.touch&&(W.touch=!1),P?navigator.pointerEnabled?t("pointer","down","move","up","cancel"):t("MSPointer","Down","Move","Up","Cancel"):W.touch?(t("touch","start","move","end","cancel"),D=!0):t("mouse","down","move","up"),p=T+" "+M+" "+I,f=S,P&&!D&&(D=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),a.likelyTouchDevice=D,m[S]=Fe,m[T]=Re,m[M]=Ve,I&&(m[I]=m[M]),W.touch&&(f+=" mousedown",p+=" mousemove mouseup",m.mousedown=m[S],m.mousemove=m[T],m.mouseup=m[M]),D||(r.allowPanToNext=!1)}}});var je,$e,Xe,qe,Ue,Qe,Ze,Ge=function(e,n,i,s){je&&clearTimeout(je),qe=!0,Xe=!0;var l;e.initialLayout?(l=e.initialLayout,e.initialLayout=null):l=r.getThumbBoundsFn&&r.getThumbBoundsFn(u);var d=i?r.hideAnimationDuration:r.showAnimationDuration,h=function(){Gt("initialZoom"),i?(a.template.removeAttribute("style"),a.bg.removeAttribute("style")):(At(1),n&&(n.style.display="block"),o.addClass(t,"pswp--animated-in"),Mt("initialZoom"+(i?"OutEnd":"InEnd"))),s&&s(),qe=!1};if(!d||!l||void 0===l.x)return Mt("initialZoom"+(i?"Out":"In")),g=e.initialZoomLevel,Ft(ht,e.initialPosition),Dt(),t.style.opacity=i?0:1,At(1),void(d?setTimeout(function(){h()},d):h());!function(){var n=c,s=!a.currItem.src||a.currItem.loadError||r.showHideOpacity;e.miniImg&&(e.miniImg.style.webkitBackfaceVisibility="hidden"),i||(g=l.w/e.w,ht.x=l.x,ht.y=l.y-L,a[s?"template":"bg"].style.opacity=.001,Dt()),Kt("initialZoom"),i&&!n&&o.removeClass(t,"pswp--animated-in"),s&&(i?o[(n?"remove":"add")+"Class"](t,"pswp--animate_opacity"):setTimeout(function(){o.addClass(t,"pswp--animate_opacity")},30)),je=setTimeout(function(){if(Mt("initialZoom"+(i?"Out":"In")),i){var a=l.w/e.w,r={x:ht.x,y:ht.y},c=g,u=rt,p=function(e){1===e?(g=a,ht.x=l.x,ht.y=l.y-R):(g=(a-c)*e+c,ht.x=(l.x-r.x)*e+r.x,ht.y=(l.y-R-r.y)*e+r.y),Dt(),s?t.style.opacity=1-e:At(u-e*u)};n?te("initialZoom",0,1,d,o.easing.cubic.out,p,h):(p(1),je=setTimeout(h,d+20))}else g=e.initialZoomLevel,Ft(ht,e.initialPosition),Dt(),At(1),s?t.style.opacity=1:At(1),je=setTimeout(h,d+20)},i?25:90)}()},Ke={},Je=[],tn={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return $e.length}},en=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},nn=function(t,e,n){var i=t.bounds;i.center.x=Math.round((Ke.x-e)/2),i.center.y=Math.round((Ke.y-n)/2)+t.vGap.top,i.max.x=e>Ke.x?Math.round(Ke.x-e):i.center.x,i.max.y=n>Ke.y?Math.round(Ke.y-n)+t.vGap.top:i.center.y,i.min.x=e>Ke.x?0:i.center.x,i.min.y=n>Ke.y?t.vGap.top:i.center.y},on=function(t,e,n){if(t.src&&!t.loadError){var i=!n;if(i&&(t.vGap||(t.vGap={top:0,bottom:0}),Mt("parseVerticalMargin",t)),Ke.x=e.x,Ke.y=e.y-t.vGap.top-t.vGap.bottom,i){var o=Ke.x/t.w,a=Ke.y/t.h;t.fitRatio=a>o?o:a;var s=r.scaleMode;"orig"===s?n=1:"fit"===s&&(n=t.fitRatio),n>1&&(n=1),t.initialZoomLevel=n,t.bounds||(t.bounds=en())}if(!n)return;return nn(t,t.w*n,t.h*n),i&&n===t.initialZoomLevel&&(t.initialPosition=t.bounds.center),t.bounds}return t.w=t.h=0,t.initialZoomLevel=t.fitRatio=1,t.bounds=en(),t.initialPosition=t.bounds.center,t.bounds},an=function(t,e,n,i,o,r){e.loadError||i&&(e.imageAppended=!0,ln(e,i,e===a.currItem&&wt),n.appendChild(i),r&&setTimeout(function(){e&&e.loaded&&e.placeholder&&(e.placeholder.style.display="none",e.placeholder=null)},500))},rn=function(t){t.loading=!0,t.loaded=!1;var e=t.img=o.createEl("pswp__img","img"),n=function(){t.loading=!1,t.loaded=!0,t.loadComplete?t.loadComplete(t):t.img=null,e.onload=e.onerror=null,e=null};return e.onload=n,e.onerror=function(){t.loadError=!0,n()},e.src=t.src,e},sn=function(t,e){return t.src&&t.loadError&&t.container?(e&&(t.container.innerHTML=""),t.container.innerHTML=r.errorMsg.replace("%url%",t.src),!0):void 0},ln=function(t,e,n){if(t.src){e||(e=t.container.lastChild);var i=n?t.w:Math.round(t.w*t.fitRatio),o=n?t.h:Math.round(t.h*t.fitRatio);t.placeholder&&!t.loaded&&(t.placeholder.style.width=i+"px",t.placeholder.style.height=o+"px"),e.style.width=i+"px",e.style.height=o+"px"}},cn=function(){if(Je.length){for(var t,e=0;e<Je.length;e++)t=Je[e],t.holder.index===t.index&&an(t.index,t.item,t.baseDiv,t.img,0,t.clearPlaceholder);Je=[]}};kt("Controller",{publicMethods:{lazyLoadItem:function(t){t=Ct(t);var e=Ue(t);e&&(!e.loaded&&!e.loading||w)&&(Mt("gettingData",t,e),e.src&&rn(e))},initController:function(){o.extend(r,tn,!0),a.items=$e=n,Ue=a.getItemAt,Qe=r.getNumItemsFn,Ze=r.loop,Qe()<3&&(r.loop=!1),Tt("beforeChange",function(t){var e,n=r.preload,i=null===t||t>=0,o=Math.min(n[0],Qe()),s=Math.min(n[1],Qe());for(e=1;(i?s:o)>=e;e++)a.lazyLoadItem(u+e);for(e=1;(i?o:s)>=e;e++)a.lazyLoadItem(u-e)}),Tt("initialLayout",function(){a.currItem.initialLayout=r.getThumbBoundsFn&&r.getThumbBoundsFn(u)}),Tt("mainScrollAnimComplete",cn),Tt("initialZoomInEnd",cn),Tt("destroy",function(){for(var t,e=0;e<$e.length;e++)t=$e[e],t.container&&(t.container=null),t.placeholder&&(t.placeholder=null),t.img&&(t.img=null),t.preloader&&(t.preloader=null),t.loadError&&(t.loaded=t.loadError=!1);Je=null})},getItemAt:function(t){return t>=0&&void 0!==$e[t]&&$e[t]},allowProgressiveImg:function(){return r.forceProgressiveLoading||!D||r.mouseUsed||screen.width>1200},setContent:function(t,e){r.loop&&(e=Ct(e));var n=a.getItemAt(t.index);n&&(n.container=null);var i,l=a.getItemAt(e);if(!l)return void(t.el.innerHTML="");Mt("gettingData",e,l),t.index=e,t.item=l;var c=l.container=o.createEl("pswp__zoom-wrap");if(!l.src&&l.html&&(l.html.tagName?c.appendChild(l.html):c.innerHTML=l.html),sn(l),on(l,pt),!l.src||l.loadError||l.loaded)l.src&&!l.loadError&&(i=o.createEl("pswp__img","img"),i.style.opacity=1,i.src=l.src,ln(l,i),an(0,l,c,i));else{if(l.loadComplete=function(n){if(s){if(t&&t.index===e){if(sn(n,!0))return n.loadComplete=n.img=null,on(n,pt),_t(n),void(t.index===u&&a.updateCurrZoomItem());n.imageAppended?!qe&&n.placeholder&&(n.placeholder.style.display="none",n.placeholder=null):W.transform&&(nt||qe)?Je.push({item:n,baseDiv:c,img:n.img,index:e,holder:t,clearPlaceholder:!0}):an(0,n,c,n.img,0,!0)}n.loadComplete=null,n.img=null,Mt("imageLoadComplete",e,n)}},o.features.transform){var d="pswp__img pswp__img--placeholder";d+=l.msrc?"":" pswp__img--placeholder--blank";var h=o.createEl(d,l.msrc?"img":"");l.msrc&&(h.src=l.msrc),ln(l,h),c.appendChild(h),l.placeholder=h}l.loading||rn(l),a.allowProgressiveImg()&&(!Xe&&W.transform?Je.push({item:l,baseDiv:c,img:l.img,index:e,holder:t}):an(0,l,c,l.img,0,!0))}Xe||e!==u?_t(l):(et=c.style,Ge(l,i||l.img)),t.el.innerHTML="",t.el.appendChild(c)},cleanSlide:function(t){t.img&&(t.img.onload=t.img.onerror=null),t.loaded=t.loading=t.img=t.imageAppended=!1}}});var un,dn={},hn=function(t,e,n){var i=document.createEvent("CustomEvent"),o={origEvent:t,target:t.target,releasePoint:e,pointerType:n||"touch"};i.initCustomEvent("pswpTap",!0,!0,o),t.target.dispatchEvent(i)};kt("Tap",{publicMethods:{initTap:function(){Tt("firstTouchStart",a.onTapStart),Tt("touchRelease",a.onTapRelease),Tt("destroy",function(){dn={},un=null})},onTapStart:function(t){t.length>1&&(clearTimeout(un),un=null)},onTapRelease:function(t,e){if(e&&!q&&!$&&!Zt){var n=e;if(un&&(clearTimeout(un),un=null,ye(n,dn)))return void Mt("doubleTap",n);if("mouse"===e.type)return void hn(t,e,"mouse");if("BUTTON"===t.target.tagName.toUpperCase()||o.hasClass(t.target,"pswp__single-tap"))return void hn(t,e);Ft(dn,n),un=setTimeout(function(){hn(t,e),un=null},300)}}}});var pn;kt("DesktopZoom",{publicMethods:{initDesktopZoom:function(){F||(D?Tt("mouseUsed",function(){a.setupDesktopZoom()}):a.setupDesktopZoom(!0))},setupDesktopZoom:function(e){pn={};var n="wheel mousewheel DOMMouseScroll";Tt("bindEvents",function(){o.bind(t,n,a.handleMouseWheel)}),Tt("unbindEvents",function(){pn&&o.unbind(t,n,a.handleMouseWheel)}),a.mouseZoomedIn=!1;var i,r=function(){a.mouseZoomedIn&&(o.removeClass(t,"pswp--zoomed-in"),a.mouseZoomedIn=!1),1>g?o.addClass(t,"pswp--zoom-allowed"):o.removeClass(t,"pswp--zoom-allowed"),s()},s=function(){i&&(o.removeClass(t,"pswp--dragging"),i=!1)};Tt("resize",r),Tt("afterChange",r),Tt("pointerDown",function(){a.mouseZoomedIn&&(i=!0,o.addClass(t,"pswp--dragging"))}),Tt("pointerUp",s),e||r()},handleMouseWheel:function(t){if(g<=a.currItem.fitRatio)return r.modal&&(!r.closeOnScroll||Zt||j?t.preventDefault():A&&Math.abs(t.deltaY)>2&&(c=!0,a.close())),!0;if(t.stopPropagation(),pn.x=0,"deltaX"in t)1===t.deltaMode?(pn.x=18*t.deltaX,pn.y=18*t.deltaY):(pn.x=t.deltaX,pn.y=t.deltaY);else if("wheelDelta"in t)t.wheelDeltaX&&(pn.x=-.16*t.wheelDeltaX),t.wheelDeltaY?pn.y=-.16*t.wheelDeltaY:pn.y=-.16*t.wheelDelta;else{if(!("detail"in t))return;pn.y=t.detail}Ht(g,!0);var e=ht.x-pn.x,n=ht.y-pn.y;(r.modal||e<=tt.min.x&&e>=tt.max.x&&n<=tt.min.y&&n>=tt.max.y)&&t.preventDefault(),a.panTo(e,n)},toggleDesktopZoom:function(e){e=e||{x:pt.x/2+mt.x,y:pt.y/2+mt.y};var n=r.getDoubleTapZoom(!0,a.currItem),i=g===n;a.mouseZoomedIn=!i,a.zoomTo(i?a.currItem.initialZoomLevel:n,e,333),o[(i?"remove":"add")+"Class"](t,"pswp--zoomed-in")}}});var fn,mn,gn,vn,yn,bn,xn,wn,kn,Cn,Sn,Tn,Mn={history:!0,galleryUID:1},In=function(){return Sn.hash.substring(1)},An=function(){fn&&clearTimeout(fn),gn&&clearTimeout(gn)},Pn=function(){var t=In(),e={};if(t.length<5)return e;var n,i=t.split("&");for(n=0;n<i.length;n++)if(i[n]){var o=i[n].split("=");o.length<2||(e[o[0]]=o[1])}if(r.galleryPIDs){var a=e.pid;for(e.pid=0,n=0;n<$e.length;n++)if($e[n].pid===a){e.pid=n;break}}else e.pid=parseInt(e.pid,10)-1;return e.pid<0&&(e.pid=0),e},Dn=function(){if(gn&&clearTimeout(gn),Zt||j)return void(gn=setTimeout(Dn,500));vn?clearTimeout(mn):vn=!0;var t=u+1,e=Ue(u);e.hasOwnProperty("pid")&&(t=e.pid);var n=xn+"&gid="+r.galleryUID+"&pid="+t;wn||-1===Sn.hash.indexOf(n)&&(Cn=!0);var i=Sn.href.split("#")[0]+"#"+n;Tn?"#"+n!==window.location.hash&&history[wn?"replaceState":"pushState"]("",document.title,i):wn?Sn.replace(i):Sn.hash=n,wn=!0,mn=setTimeout(function(){vn=!1},60)};kt("History",{publicMethods:{initHistory:function(){if(o.extend(r,Mn,!0),r.history){Sn=window.location,Cn=!1,kn=!1,wn=!1,xn=In(),Tn="pushState"in history,xn.indexOf("gid=")>-1&&(xn=xn.split("&gid=")[0],xn=xn.split("?gid=")[0]),Tt("afterChange",a.updateURL),Tt("unbindEvents",function(){o.unbind(window,"hashchange",a.onHashChange)});var t=function(){bn=!0,kn||(Cn?history.back():xn?Sn.hash=xn:Tn?history.pushState("",document.title,Sn.pathname+Sn.search):Sn.hash=""),An()};Tt("unbindEvents",function(){c&&t()}),Tt("destroy",function(){bn||t()}),Tt("firstUpdate",function(){u=Pn().pid});var e=xn.indexOf("pid=");e>-1&&(xn=xn.substring(0,e),"&"===xn.slice(-1)&&(xn=xn.slice(0,-1))),setTimeout(function(){s&&o.bind(window,"hashchange",a.onHashChange)},40)}},onHashChange:function(){return In()===xn?(kn=!0,void a.close()):void(vn||(yn=!0,a.goTo(Pn().pid),yn=!1))},
updateURL:function(){An(),yn||(wn?fn=setTimeout(Dn,800):Dn())}}}),o.extend(a,ee)}}),function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.PhotoSwipeUI_Default=e()}(this,function(){"use strict";return function(t,e){var n,i,o,a,r,s,l,c,u,d,h,p,f,m,g,v,y,b,x,w=this,k=!1,C=!0,S=!0,T={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(t,e){return t.title?(e.children[0].innerHTML=t.title,!0):(e.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return t.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return t.currItem.title||""},indexIndicatorSep:" / ",fitControlsWidth:1200},M=function(t){if(v)return!0;t=t||window.event,g.timeToIdle&&g.mouseUsed&&!u&&R();for(var n,i,o=t.target||t.srcElement,a=o.getAttribute("class")||"",r=0;r<j.length;r++)n=j[r],n.onTap&&a.indexOf("pswp__"+n.name)>-1&&(n.onTap(),i=!0);if(i){t.stopPropagation&&t.stopPropagation(),v=!0;var s=e.features.isOldAndroid?600:30;y=setTimeout(function(){v=!1},s)}},I=function(){return!t.likelyTouchDevice||g.mouseUsed||screen.width>g.fitControlsWidth},A=function(t,n,i){e[(i?"add":"remove")+"Class"](t,"pswp__"+n)},P=function(){var t=1===g.getNumItemsFn();t!==m&&(A(i,"ui--one-slide",t),m=t)},D=function(){A(l,"share-modal--hidden",S)},_=function(){return S=!S,S?(e.removeClass(l,"pswp__share-modal--fade-in"),setTimeout(function(){S&&D()},300)):(D(),setTimeout(function(){S||e.addClass(l,"pswp__share-modal--fade-in")},30)),S||O(),!1},E=function(e){e=e||window.event;var n=e.target||e.srcElement;return t.shout("shareLinkClick",e,n),!!n.href&&(!!n.hasAttribute("download")||(window.open(n.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),S||_(),!1))},O=function(){for(var t,e,n,i,o,a="",r=0;r<g.shareButtons.length;r++)t=g.shareButtons[r],n=g.getImageURLForShare(t),i=g.getPageURLForShare(t),o=g.getTextForShare(t),e=t.url.replace("{{url}}",encodeURIComponent(i)).replace("{{image_url}}",encodeURIComponent(n)).replace("{{raw_image_url}}",n).replace("{{text}}",encodeURIComponent(o)),a+='<a href="'+e+'" target="_blank" class="pswp__share--'+t.id+'"'+(t.download?"download":"")+">"+t.label+"</a>",g.parseShareButtonOut&&(a=g.parseShareButtonOut(t,a));l.children[0].innerHTML=a,l.children[0].onclick=E},L=function(t){for(var n=0;n<g.closeElClasses.length;n++)if(e.hasClass(t,"pswp__"+g.closeElClasses[n]))return!0},F=0,R=function(){clearTimeout(x),F=0,u&&w.setIdle(!1)},W=function(t){t=t?t:window.event;var e=t.relatedTarget||t.toElement;e&&"HTML"!==e.nodeName||(clearTimeout(x),x=setTimeout(function(){w.setIdle(!0)},g.timeToIdleOutside))},V=function(){g.fullscreenEl&&!e.features.isOldAndroid&&(n||(n=w.getFullscreenAPI()),n?(e.bind(document,n.eventK,w.updateFullscreen),w.updateFullscreen(),e.addClass(t.template,"pswp--supports-fs")):e.removeClass(t.template,"pswp--supports-fs"))},z=function(){g.preloaderEl&&(N(!0),d("beforeChange",function(){clearTimeout(f),f=setTimeout(function(){t.currItem&&t.currItem.loading?(!t.allowProgressiveImg()||t.currItem.img&&!t.currItem.img.naturalWidth)&&N(!1):N(!0)},g.loadingIndicatorDelay)}),d("imageLoadComplete",function(e,n){t.currItem===n&&N(!0)}))},N=function(t){p!==t&&(A(h,"preloader--active",!t),p=t)},H=function(t){var n=t.vGap;if(I()){var r=g.barsSize;if(g.captionEl&&"auto"===r.bottom)if(a||(a=e.createEl("pswp__caption pswp__caption--fake"),a.appendChild(e.createEl("pswp__caption__center")),i.insertBefore(a,o),e.addClass(i,"pswp__ui--fit")),g.addCaptionHTMLFn(t,a,!0)){var s=a.clientHeight;n.bottom=parseInt(s,10)||44}else n.bottom=r.top;else n.bottom="auto"===r.bottom?0:r.bottom;n.top=r.top}else n.top=n.bottom=0},B=function(){g.timeToIdle&&d("mouseUsed",function(){e.bind(document,"mousemove",R),e.bind(document,"mouseout",W),b=setInterval(function(){2===++F&&w.setIdle(!0)},g.timeToIdle/2)})},Y=function(){d("onVerticalDrag",function(t){C&&.95>t?w.hideControls():!C&&t>=.95&&w.showControls()});var t;d("onPinchClose",function(e){C&&.9>e?(w.hideControls(),t=!0):t&&!C&&e>.9&&w.showControls()}),d("zoomGestureEnded",function(){(t=!1)&&!C&&w.showControls()})},j=[{name:"caption",option:"captionEl",onInit:function(t){o=t}},{name:"share-modal",option:"shareEl",onInit:function(t){l=t},onTap:function(){_()}},{name:"button--share",option:"shareEl",onInit:function(t){s=t},onTap:function(){_()}},{name:"button--zoom",option:"zoomEl",onTap:t.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(t){r=t}},{name:"button--close",option:"closeEl",onTap:t.close},{name:"button--arrow--left",option:"arrowEl",onTap:t.prev},{name:"button--arrow--right",option:"arrowEl",onTap:t.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){n.isFullscreen()?n.exit():n.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(t){h=t}}],$=function(){var t,n,o,a=function(i){if(i)for(var a=i.length,r=0;a>r;r++){t=i[r],n=t.className;for(var s=0;s<j.length;s++)o=j[s],n.indexOf("pswp__"+o.name)>-1&&(g[o.option]?(e.removeClass(t,"pswp__element--disabled"),o.onInit&&o.onInit(t)):e.addClass(t,"pswp__element--disabled"))}};a(i.children);var r=e.getChildByClass(i,"pswp__top-bar");r&&a(r.children)};w.init=function(){e.extend(t.options,T,!0),g=t.options,i=e.getChildByClass(t.scrollWrap,"pswp__ui"),d=t.listen,Y(),d("beforeChange",w.update),d("doubleTap",function(e){var n=t.currItem.initialZoomLevel;t.getZoomLevel()!==n?t.zoomTo(n,e,333):t.zoomTo(g.getDoubleTapZoom(!1,t.currItem),e,333)}),d("preventDragEvent",function(t,e,n){var i=t.target||t.srcElement;i&&i.getAttribute("class")&&t.type.indexOf("mouse")>-1&&(i.getAttribute("class").indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(i.tagName))&&(n.prevent=!1)}),d("bindEvents",function(){e.bind(i,"pswpTap click",M),e.bind(t.scrollWrap,"pswpTap",w.onGlobalTap),t.likelyTouchDevice||e.bind(t.scrollWrap,"mouseover",w.onMouseOver)}),d("unbindEvents",function(){S||_(),b&&clearInterval(b),e.unbind(document,"mouseout",W),e.unbind(document,"mousemove",R),e.unbind(i,"pswpTap click",M),e.unbind(t.scrollWrap,"pswpTap",w.onGlobalTap),e.unbind(t.scrollWrap,"mouseover",w.onMouseOver),n&&(e.unbind(document,n.eventK,w.updateFullscreen),n.isFullscreen()&&(g.hideAnimationDuration=0,n.exit()),n=null)}),d("destroy",function(){g.captionEl&&(a&&i.removeChild(a),e.removeClass(o,"pswp__caption--empty")),l&&(l.children[0].onclick=null),e.removeClass(i,"pswp__ui--over-close"),e.addClass(i,"pswp__ui--hidden"),w.setIdle(!1)}),g.showAnimationDuration||e.removeClass(i,"pswp__ui--hidden"),d("initialZoomIn",function(){g.showAnimationDuration&&e.removeClass(i,"pswp__ui--hidden")}),d("initialZoomOut",function(){e.addClass(i,"pswp__ui--hidden")}),d("parseVerticalMargin",H),$(),g.shareEl&&s&&l&&(S=!0),P(),B(),V(),z()},w.setIdle=function(t){u=t,A(i,"ui--idle",t)},w.update=function(){C&&t.currItem?(w.updateIndexIndicator(),g.captionEl&&(g.addCaptionHTMLFn(t.currItem,o),A(o,"caption--empty",!t.currItem.title)),k=!0):k=!1,S||_(),P()},w.updateFullscreen=function(i){i&&setTimeout(function(){t.setScrollOffset(0,e.getScrollY())},50),e[(n.isFullscreen()?"add":"remove")+"Class"](t.template,"pswp--fs")},w.updateIndexIndicator=function(){g.counterEl&&(r.innerHTML=t.getCurrentIndex()+1+g.indexIndicatorSep+g.getNumItemsFn())},w.onGlobalTap=function(n){n=n||window.event;var i=n.target||n.srcElement;if(!v)if(n.detail&&"mouse"===n.detail.pointerType){if(L(i))return void t.close();e.hasClass(i,"pswp__img")&&(1===t.getZoomLevel()&&t.getZoomLevel()<=t.currItem.fitRatio?g.clickToCloseNonZoomable&&t.close():t.toggleDesktopZoom(n.detail.releasePoint))}else if(g.tapToToggleControls&&(C?w.hideControls():w.showControls()),g.tapToClose&&(e.hasClass(i,"pswp__img")||L(i)))return void t.close()},w.onMouseOver=function(t){t=t||window.event,A(i,"ui--over-close",L(t.target||t.srcElement))},w.hideControls=function(){e.addClass(i,"pswp__ui--hidden"),C=!1},w.showControls=function(){C=!0,k||w.update(),e.removeClass(i,"pswp__ui--hidden")},w.supportsFullscreen=function(){var t=document;return!!(t.exitFullscreen||t.mozCancelFullScreen||t.webkitExitFullscreen||t.msExitFullscreen)},w.getFullscreenAPI=function(){var e,n=document.documentElement,i="fullscreenchange";return n.requestFullscreen?e={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:i}:n.mozRequestFullScreen?e={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+i}:n.webkitRequestFullscreen?e={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+i}:n.msRequestFullscreen&&(e={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),e&&(e.enter=function(){return c=g.closeOnScroll,g.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?t.template[this.enterK]():void t.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},e.exit=function(){return g.closeOnScroll=c,document[this.exitK]()},e.isFullscreen=function(){return document[this.elementK]}),e}}});var initPhotoSwipeFromDOM=function(t){for(var e=function(t){for(var e,n,i,o,a=t.childNodes,r=a.length,s=[],l=0;l<r;l++)e=a[l],1===e.nodeType&&(n=e.children[0],i=n.getAttribute("data-size").split("x"),o={src:n.getAttribute("href"),w:parseInt(i[0],10),h:parseInt(i[1],10)},e.children.length>1&&(o.title=e.children[1].innerHTML),n.children.length>0&&(o.msrc=n.children[0].getAttribute("src")),o.el=e,s.push(o));return s},n=function t(e,n){return e&&(n(e)?e:t(e.parentNode,n))},i=function(t){t=t||window.event,t.preventDefault?t.preventDefault():t.returnValue=!1;var e=t.target||t.srcElement,i=n(e,function(t){return t.tagName&&"FIGURE"===t.tagName.toUpperCase()});if(i){for(var a,r=i.parentNode,s=i.parentNode.childNodes,l=s.length,c=0,u=0;u<l;u++)if(1===s[u].nodeType){if(s[u]===i){a=c;break}c++}return a>=0&&o(a,r),!1}},o=function(t,n,i,o){var a,r,s,l=document.querySelectorAll(".pswp")[0];if(s=e(n),r={galleryUID:n.getAttribute("data-pswp-uid"),getThumbBoundsFn:function(t){var e=s[t].el.getElementsByTagName("img")[0],n=window.pageYOffset||document.documentElement.scrollTop,i=e.getBoundingClientRect();return{x:i.left,y:i.top+n,w:i.width}}},o)if(r.galleryPIDs){for(var c=0;c<s.length;c++)if(s[c].pid==t){r.index=c;break}}else r.index=parseInt(t,10)-1;else r.index=parseInt(t,10);isNaN(r.index)||(i&&(r.showAnimationDuration=0),a=new PhotoSwipe(l,PhotoSwipeUI_Default,s,r),a.init())},a=document.querySelectorAll(t),r=0,s=a.length;r<s;r++)a[r].setAttribute("data-pswp-uid",r+1),a[r].onclick=i;var l=function(){var t=window.location.hash.substring(1),e={};if(t.length<5)return e;for(var n=t.split("&"),i=0;i<n.length;i++)if(n[i]){var o=n[i].split("=");o.length<2||(e[o[0]]=o[1])}return e.gid&&(e.gid=parseInt(e.gid,10)),e}();l.pid&&l.gid&&o(l.pid,a[l.gid-1],!0,!0)};initPhotoSwipeFromDOM(".mdb-lightbox"),function(t){t.fn.sticky=function(e){var n={topSpacing:0,zIndex:"",stopper:".sticky-stopper",stickyClass:!1},i=t.extend({},n,e),o=function(){return"number"==typeof i.zIndex}(),a=function(){return 0<t(i.stopper).length||"number"==typeof i.stopper}();return this.each(function(){function e(){var e=p.scrollTop(),s=h,f=n.parent().width();if(d.width(f),a&&"string"==typeof h){s=t(h).offset().top-r-l}if(u<e){if(i.stickyClass&&n.addClass(i.stickyClass),n.after(d).css({position:"fixed",top:l,width:f}),o&&n.css({zIndex:c}),a&&s<e){var m=s-e+l;n.css({top:m})}}else i.stickyClass&&n.removeClass(i.stickyClass),n.css({position:"static",top:null,left:null,width:"auto"}),d.remove()}var n=t(this),r=n.outerHeight(),s=n.outerWidth(),l=i.topSpacing,c=i.zIndex,u=n.offset().top-l,d=t("<div></div>").width(s).height(r).addClass("sticky-placeholder"),h=i.stopper,p=t(window);p.innerHeight()>r&&(p.bind("scroll",e),p.bind("load",e),p.bind("resize",e))})}}(jQuery),function t(e,n,i){function o(r,s){if(!n[r]){if(!e[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(a)return a(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[r]={exports:{}};e[r][0].call(u.exports,function(t){var n=e[r][1][t];return o(n?n:t)},u,u.exports,t,e,n,i)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<i.length;r++)o(i[r]);return o}({1:[function(t,e,n){"use strict";var i=t("../main");"function"==typeof define&&define.amd?define(i):(window.PerfectScrollbar=i,void 0===window.Ps&&(window.Ps=i))},{"../main":7}],2:[function(t,e,n){"use strict";function i(t,e){var n=t.className.split(" ");n.indexOf(e)<0&&n.push(e),t.className=n.join(" ")}function o(t,e){var n=t.className.split(" "),i=n.indexOf(e);i>=0&&n.splice(i,1),t.className=n.join(" ")}n.add=function(t,e){t.classList?t.classList.add(e):i(t,e)},n.remove=function(t,e){t.classList?t.classList.remove(e):o(t,e)},n.list=function(t){return t.classList?Array.prototype.slice.apply(t.classList):t.className.split(" ")}},{}],3:[function(t,e,n){"use strict";function i(t,e){return window.getComputedStyle(t)[e]}function o(t,e,n){return"number"==typeof n&&(n=n.toString()+"px"),t.style[e]=n,t}function a(t,e){for(var n in e){var i=e[n];"number"==typeof i&&(i=i.toString()+"px"),t.style[n]=i}return t}var r={};r.e=function(t,e){var n=document.createElement(t);return n.className=e,n},r.appendTo=function(t,e){return e.appendChild(t),t},r.css=function(t,e,n){return"object"==typeof e?a(t,e):void 0===n?i(t,e):o(t,e,n)},r.matches=function(t,e){return void 0!==t.matches?t.matches(e):void 0!==t.matchesSelector?t.matchesSelector(e):void 0!==t.webkitMatchesSelector?t.webkitMatchesSelector(e):void 0!==t.mozMatchesSelector?t.mozMatchesSelector(e):void 0!==t.msMatchesSelector?t.msMatchesSelector(e):void 0},r.remove=function(t){void 0!==t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)},r.queryChildren=function(t,e){return Array.prototype.filter.call(t.childNodes,function(t){return r.matches(t,e)})},e.exports=r},{}],4:[function(t,e,n){"use strict";var i=function(t){this.element=t,this.events={}};i.prototype.bind=function(t,e){void 0===this.events[t]&&(this.events[t]=[]),this.events[t].push(e),this.element.addEventListener(t,e,!1)},i.prototype.unbind=function(t,e){var n=void 0!==e;this.events[t]=this.events[t].filter(function(i){return!(!n||i===e)||(this.element.removeEventListener(t,i,!1),!1)},this)},i.prototype.unbindAll=function(){for(var t in this.events)this.unbind(t)};var o=function(){this.eventElements=[]};o.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return void 0===e&&(e=new i(t),this.eventElements.push(e)),e},o.prototype.bind=function(t,e,n){this.eventElement(t).bind(e,n)},o.prototype.unbind=function(t,e,n){this.eventElement(t).unbind(e,n)},o.prototype.unbindAll=function(){for(var t=0;t<this.eventElements.length;t++)this.eventElements[t].unbindAll()},o.prototype.once=function(t,e,n){var i=this.eventElement(t),o=function(t){i.unbind(e,o),n(t)};i.bind(e,o)},e.exports=o},{}],5:[function(t,e,n){"use strict";e.exports=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}}()},{}],6:[function(t,e,n){"use strict";function i(t){return function(e,n){t(e,"ps--in-scrolling"),void 0!==n?t(e,"ps--"+n):(t(e,"ps--x"),t(e,"ps--y"))}}var o=t("./class"),a=t("./dom"),r=n.toInt=function(t){return parseInt(t,10)||0},s=n.clone=function(t){if(t){if(Array.isArray(t))return t.map(s);if("object"==typeof t){var e={};for(var n in t)e[n]=s(t[n]);return e}return t}return null};n.extend=function(t,e){var n=s(t);for(var i in e)n[i]=s(e[i]);return n},n.isEditable=function(t){return a.matches(t,"input,[contenteditable]")||a.matches(t,"select,[contenteditable]")||a.matches(t,"textarea,[contenteditable]")||a.matches(t,"button,[contenteditable]")},n.removePsClasses=function(t){for(var e=o.list(t),n=0;n<e.length;n++){var i=e[n];0===i.indexOf("ps-")&&o.remove(t,i)}},n.outerWidth=function(t){return r(a.css(t,"width"))+r(a.css(t,"paddingLeft"))+r(a.css(t,"paddingRight"))+r(a.css(t,"borderLeftWidth"))+r(a.css(t,"borderRightWidth"))},n.startScrolling=i(o.add),n.stopScrolling=i(o.remove),n.env={isWebKit:"undefined"!=typeof document&&"WebkitAppearance"in document.documentElement.style,supportsTouch:"undefined"!=typeof window&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),supportsIePointer:"undefined"!=typeof window&&null!==window.navigator.msMaxTouchPoints}},{"./class":2,"./dom":3}],7:[function(t,e,n){"use strict";var i=t("./plugin/destroy"),o=t("./plugin/initialize"),a=t("./plugin/update");e.exports={initialize:o,update:a,destroy:i}},{"./plugin/destroy":9,"./plugin/initialize":17,"./plugin/update":21}],8:[function(t,e,n){"use strict";e.exports={handlers:["click-rail","drag-scrollbar","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipePropagation:!0,swipeEasing:!0,useBothWheelAxes:!1,wheelPropagation:!1,wheelSpeed:1,theme:"default"}},{}],9:[function(t,e,n){"use strict";var i=t("../lib/helper"),o=t("../lib/dom"),a=t("./instances");e.exports=function(t){var e=a.get(t);e&&(e.event.unbindAll(),o.remove(e.scrollbarX),o.remove(e.scrollbarY),o.remove(e.scrollbarXRail),o.remove(e.scrollbarYRail),i.removePsClasses(t),a.remove(t))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18}],10:[function(t,e,n){"use strict";function i(t,e){function n(t){return t.getBoundingClientRect()}var i=function(t){t.stopPropagation()};e.event.bind(e.scrollbarY,"click",i),e.event.bind(e.scrollbarYRail,"click",function(i){var o=i.pageY-window.pageYOffset-n(e.scrollbarYRail).top,s=o>e.scrollbarYTop?1:-1;r(t,"top",t.scrollTop+s*e.containerHeight),a(t),i.stopPropagation()}),e.event.bind(e.scrollbarX,"click",i),e.event.bind(e.scrollbarXRail,"click",function(i){var o=i.pageX-window.pageXOffset-n(e.scrollbarXRail).left,s=o>e.scrollbarXLeft?1:-1;r(t,"left",t.scrollLeft+s*e.containerWidth),a(t),i.stopPropagation()})}var o=t("../instances"),a=t("../update-geometry"),r=t("../update-scroll");e.exports=function(t){i(t,o.get(t))}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],11:[function(t,e,n){"use strict";function i(t,e){function n(n){var o=i+n*e.railXRatio,r=Math.max(0,e.scrollbarXRail.getBoundingClientRect().left)+e.railXRatio*(e.railXWidth-e.scrollbarXWidth);e.scrollbarXLeft=o<0?0:o>r?r:o,c(t,"left",a.toInt(e.scrollbarXLeft*(e.contentWidth-e.containerWidth)/(e.containerWidth-e.railXRatio*e.scrollbarXWidth))-e.negativeScrollAdjustment)}var i=null,o=null,s=function(e){n(e.pageX-o),l(t),e.stopPropagation(),e.preventDefault()},u=function(){a.stopScrolling(t,"x"),e.event.unbind(e.ownerDocument,"mousemove",s)};e.event.bind(e.scrollbarX,"mousedown",function(n){o=n.pageX,i=a.toInt(r.css(e.scrollbarX,"left"))*e.railXRatio,a.startScrolling(t,"x"),e.event.bind(e.ownerDocument,"mousemove",s),e.event.once(e.ownerDocument,"mouseup",u),n.stopPropagation(),n.preventDefault()})}function o(t,e){function n(n){var o=i+n*e.railYRatio,r=Math.max(0,e.scrollbarYRail.getBoundingClientRect().top)+e.railYRatio*(e.railYHeight-e.scrollbarYHeight);e.scrollbarYTop=o<0?0:o>r?r:o,c(t,"top",a.toInt(e.scrollbarYTop*(e.contentHeight-e.containerHeight)/(e.containerHeight-e.railYRatio*e.scrollbarYHeight)))}var i=null,o=null,s=function(e){n(e.pageY-o),l(t),e.stopPropagation(),e.preventDefault()},u=function(){a.stopScrolling(t,"y"),e.event.unbind(e.ownerDocument,"mousemove",s)};e.event.bind(e.scrollbarY,"mousedown",function(n){o=n.pageY,i=a.toInt(r.css(e.scrollbarY,"top"))*e.railYRatio,a.startScrolling(t,"y"),e.event.bind(e.ownerDocument,"mousemove",s),e.event.once(e.ownerDocument,"mouseup",u),n.stopPropagation(),n.preventDefault()})}var a=t("../../lib/helper"),r=t("../../lib/dom"),s=t("../instances"),l=t("../update-geometry"),c=t("../update-scroll");e.exports=function(t){var e=s.get(t);i(t,e),o(t,e)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],12:[function(t,e,n){"use strict";function i(t,e){function n(n,i){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&i>0||o>=e.contentHeight-e.containerHeight&&i<0)return!e.settings.wheelPropagation}var a=t.scrollLeft;if(0===i){if(!e.scrollbarXActive)return!1;if(0===a&&n<0||a>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}var i=!1;e.event.bind(t,"mouseenter",function(){i=!0}),e.event.bind(t,"mouseleave",function(){i=!1});var r=!1;e.event.bind(e.ownerDocument,"keydown",function(c){if(!(c.isDefaultPrevented&&c.isDefaultPrevented()||c.defaultPrevented)){var u=a.matches(e.scrollbarX,":focus")||a.matches(e.scrollbarY,":focus");if(i||u){var d=document.activeElement?document.activeElement:e.ownerDocument.activeElement;if(d){if("IFRAME"===d.tagName)d=d.contentDocument.activeElement;else for(;d.shadowRoot;)d=d.shadowRoot.activeElement;if(o.isEditable(d))return}var h=0,p=0;switch(c.which){case 37:h=c.metaKey?-e.contentWidth:c.altKey?-e.containerWidth:-30;break;case 38:p=c.metaKey?e.contentHeight:c.altKey?e.containerHeight:30;break;case 39:h=c.metaKey?e.contentWidth:c.altKey?e.containerWidth:30;break;case 40:p=c.metaKey?-e.contentHeight:c.altKey?-e.containerHeight:-30;break;case 33:p=90;break;case 32:p=c.shiftKey?90:-90;break;case 34:p=-90;break;case 35:p=c.ctrlKey?-e.contentHeight:-e.containerHeight;break;case 36:p=c.ctrlKey?t.scrollTop:e.containerHeight;break;default:return}l(t,"top",t.scrollTop-p),l(t,"left",t.scrollLeft+h),s(t),(r=n(h,p))&&c.preventDefault()}}})}var o=t("../../lib/helper"),a=t("../../lib/dom"),r=t("../instances"),s=t("../update-geometry"),l=t("../update-scroll");e.exports=function(t){i(t,r.get(t))}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],13:[function(t,e,n){"use strict";function i(t,e){function n(n,i){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&i>0||o>=e.contentHeight-e.containerHeight&&i<0)return!e.settings.wheelPropagation}var a=t.scrollLeft;if(0===i){if(!e.scrollbarXActive)return!1;if(0===a&&n<0||a>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}function i(t){var e=t.deltaX,n=-1*t.deltaY;return void 0!==e&&void 0!==n||(e=-1*t.wheelDeltaX/6,n=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(e*=10,n*=10),e!==e&&n!==n&&(e=0,n=t.wheelDelta),t.shiftKey?[-n,-e]:[e,n]}function o(e,n){var i=t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");if(i){var o=window.getComputedStyle(i);if(![o.overflow,o.overflowX,o.overflowY].join("").match(/(scroll|auto)/))return!1;var a=i.scrollHeight-i.clientHeight;if(a>0&&!(0===i.scrollTop&&n>0||i.scrollTop===a&&n<0))return!0;var r=i.scrollLeft-i.clientWidth;if(r>0&&!(0===i.scrollLeft&&e<0||i.scrollLeft===r&&e>0))return!0}return!1}function s(s){var c=i(s),u=c[0],d=c[1];o(u,d)||(l=!1,e.settings.useBothWheelAxes?e.scrollbarYActive&&!e.scrollbarXActive?(d?r(t,"top",t.scrollTop-d*e.settings.wheelSpeed):r(t,"top",t.scrollTop+u*e.settings.wheelSpeed),l=!0):e.scrollbarXActive&&!e.scrollbarYActive&&(u?r(t,"left",t.scrollLeft+u*e.settings.wheelSpeed):r(t,"left",t.scrollLeft-d*e.settings.wheelSpeed),l=!0):(r(t,"top",t.scrollTop-d*e.settings.wheelSpeed),r(t,"left",t.scrollLeft+u*e.settings.wheelSpeed)),a(t),(l=l||n(u,d))&&(s.stopPropagation(),s.preventDefault()))}var l=!1;void 0!==window.onwheel?e.event.bind(t,"wheel",s):void 0!==window.onmousewheel&&e.event.bind(t,"mousewheel",s)}var o=t("../instances"),a=t("../update-geometry"),r=t("../update-scroll");e.exports=function(t){i(t,o.get(t))}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],14:[function(t,e,n){"use strict";function i(t,e){e.event.bind(t,"scroll",function(){a(t)})}var o=t("../instances"),a=t("../update-geometry");e.exports=function(t){i(t,o.get(t))}},{"../instances":18,"../update-geometry":19}],15:[function(t,e,n){"use strict";function i(t,e){function n(){var t=window.getSelection?window.getSelection():document.getSelection?document.getSelection():"";return 0===t.toString().length?null:t.getRangeAt(0).commonAncestorContainer}function i(){c||(c=setInterval(function(){return a.get(t)?(s(t,"top",t.scrollTop+u.top),s(t,"left",t.scrollLeft+u.left),void r(t)):void clearInterval(c)},50))}function l(){c&&(clearInterval(c),c=null),o.stopScrolling(t)}var c=null,u={top:0,left:0},d=!1;e.event.bind(e.ownerDocument,"selectionchange",function(){t.contains(n())?d=!0:(d=!1,l())}),e.event.bind(window,"mouseup",function(){d&&(d=!1,l())}),e.event.bind(window,"keyup",function(){d&&(d=!1,l())}),e.event.bind(window,"mousemove",function(e){if(d){var n={x:e.pageX,y:e.pageY},a={left:t.offsetLeft,right:t.offsetLeft+t.offsetWidth,top:t.offsetTop,bottom:t.offsetTop+t.offsetHeight};n.x<a.left+3?(u.left=-5,o.startScrolling(t,"x")):n.x>a.right-3?(u.left=5,o.startScrolling(t,"x")):u.left=0,n.y<a.top+3?(a.top+3-n.y<5?u.top=-5:u.top=-20,o.startScrolling(t,"y")):n.y>a.bottom-3?(n.y-a.bottom+3<5?u.top=5:u.top=20,o.startScrolling(t,"y")):u.top=0,0===u.top&&0===u.left?l():i()}})}var o=t("../../lib/helper"),a=t("../instances"),r=t("../update-geometry"),s=t("../update-scroll");e.exports=function(t){i(t,a.get(t))}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],16:[function(t,e,n){"use strict";function i(t,e,n,i){function o(n,i){var o=t.scrollTop,a=t.scrollLeft,r=Math.abs(n),s=Math.abs(i);if(s>r){if(i<0&&o===e.contentHeight-e.containerHeight||i>0&&0===o)return!e.settings.swipePropagation}else if(r>s&&(n<0&&a===e.contentWidth-e.containerWidth||n>0&&0===a))return!e.settings.swipePropagation;return!0}function l(e,n){s(t,"top",t.scrollTop-n),s(t,"left",t.scrollLeft-e),r(t)}function c(){x=!0}function u(){x=!1}function d(t){return t.targetTouches?t.targetTouches[0]:t}function h(t){return!(!t.targetTouches||1!==t.targetTouches.length)||!(!t.pointerType||"mouse"===t.pointerType||t.pointerType===t.MSPOINTER_TYPE_MOUSE)}function p(t){if(h(t)){w=!0;var e=d(t);g.pageX=e.pageX,g.pageY=e.pageY,v=(new Date).getTime(),null!==b&&clearInterval(b),t.stopPropagation()}}function f(t){if(!w&&e.settings.swipePropagation&&p(t),!x&&w&&h(t)){var n=d(t),i={pageX:n.pageX,pageY:n.pageY},a=i.pageX-g.pageX,r=i.pageY-g.pageY;l(a,r),g=i;var s=(new Date).getTime(),c=s-v;c>0&&(y.x=a/c,y.y=r/c,v=s),o(a,r)&&(t.stopPropagation(),t.preventDefault())}}function m(){!x&&w&&(w=!1,e.settings.swipeEasing&&(clearInterval(b),b=setInterval(function(){return a.get(t)&&(y.x||y.y)?Math.abs(y.x)<.01&&Math.abs(y.y)<.01?void clearInterval(b):(l(30*y.x,30*y.y),y.x*=.8,void(y.y*=.8)):void clearInterval(b)},10)))}var g={},v=0,y={},b=null,x=!1,w=!1;n?(e.event.bind(window,"touchstart",c),e.event.bind(window,"touchend",u),e.event.bind(t,"touchstart",p),e.event.bind(t,"touchmove",f),e.event.bind(t,"touchend",m)):i&&(window.PointerEvent?(e.event.bind(window,"pointerdown",c),e.event.bind(window,"pointerup",u),e.event.bind(t,"pointerdown",p),e.event.bind(t,"pointermove",f),e.event.bind(t,"pointerup",m)):window.MSPointerEvent&&(e.event.bind(window,"MSPointerDown",c),e.event.bind(window,"MSPointerUp",u),e.event.bind(t,"MSPointerDown",p),e.event.bind(t,"MSPointerMove",f),e.event.bind(t,"MSPointerUp",m)))}var o=t("../../lib/helper"),a=t("../instances"),r=t("../update-geometry"),s=t("../update-scroll");e.exports=function(t){if(o.env.supportsTouch||o.env.supportsIePointer){i(t,a.get(t),o.env.supportsTouch,o.env.supportsIePointer)}}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],17:[function(t,e,n){"use strict";var i=t("../lib/helper"),o=t("../lib/class"),a=t("./instances"),r=t("./update-geometry"),s={"click-rail":t("./handler/click-rail"),"drag-scrollbar":t("./handler/drag-scrollbar"),keyboard:t("./handler/keyboard"),wheel:t("./handler/mouse-wheel"),touch:t("./handler/touch"),selection:t("./handler/selection")},l=t("./handler/native-scroll");e.exports=function(t,e){e="object"==typeof e?e:{},o.add(t,"ps");var n=a.add(t);n.settings=i.extend(n.settings,e),o.add(t,"ps--theme_"+n.settings.theme),n.settings.handlers.forEach(function(e){s[e](t)}),l(t),r(t)}},{"../lib/class":2,"../lib/helper":6,"./handler/click-rail":10,"./handler/drag-scrollbar":11,"./handler/keyboard":12,"./handler/mouse-wheel":13,"./handler/native-scroll":14,"./handler/selection":15,"./handler/touch":16,"./instances":18,"./update-geometry":19}],18:[function(t,e,n){"use strict";function i(t){function e(){l.add(t,"ps--focus")}function n(){l.remove(t,"ps--focus")}var i=this;i.settings=s.clone(c),i.containerWidth=null,i.containerHeight=null,i.contentWidth=null,i.contentHeight=null,i.isRtl="rtl"===u.css(t,"direction"),i.isNegativeScroll=function(){var e=t.scrollLeft,n=null;return t.scrollLeft=-1,n=t.scrollLeft<0,t.scrollLeft=e,n}(),i.negativeScrollAdjustment=i.isNegativeScroll?t.scrollWidth-t.clientWidth:0,i.event=new d,i.ownerDocument=t.ownerDocument||document,i.scrollbarXRail=u.appendTo(u.e("div","ps__scrollbar-x-rail"),t),i.scrollbarX=u.appendTo(u.e("div","ps__scrollbar-x"),i.scrollbarXRail),i.scrollbarX.setAttribute("tabindex",0),i.event.bind(i.scrollbarX,"focus",e),i.event.bind(i.scrollbarX,"blur",n),i.scrollbarXActive=null,i.scrollbarXWidth=null,i.scrollbarXLeft=null,i.scrollbarXBottom=s.toInt(u.css(i.scrollbarXRail,"bottom")),i.isScrollbarXUsingBottom=i.scrollbarXBottom===i.scrollbarXBottom,i.scrollbarXTop=i.isScrollbarXUsingBottom?null:s.toInt(u.css(i.scrollbarXRail,"top")),i.railBorderXWidth=s.toInt(u.css(i.scrollbarXRail,"borderLeftWidth"))+s.toInt(u.css(i.scrollbarXRail,"borderRightWidth")),u.css(i.scrollbarXRail,"display","block"),i.railXMarginWidth=s.toInt(u.css(i.scrollbarXRail,"marginLeft"))+s.toInt(u.css(i.scrollbarXRail,"marginRight")),u.css(i.scrollbarXRail,"display",""),i.railXWidth=null,i.railXRatio=null,i.scrollbarYRail=u.appendTo(u.e("div","ps__scrollbar-y-rail"),t),i.scrollbarY=u.appendTo(u.e("div","ps__scrollbar-y"),i.scrollbarYRail),i.scrollbarY.setAttribute("tabindex",0),i.event.bind(i.scrollbarY,"focus",e),i.event.bind(i.scrollbarY,"blur",n),i.scrollbarYActive=null,i.scrollbarYHeight=null,i.scrollbarYTop=null,i.scrollbarYRight=s.toInt(u.css(i.scrollbarYRail,"right")),i.isScrollbarYUsingRight=i.scrollbarYRight===i.scrollbarYRight,i.scrollbarYLeft=i.isScrollbarYUsingRight?null:s.toInt(u.css(i.scrollbarYRail,"left")),i.scrollbarYOuterWidth=i.isRtl?s.outerWidth(i.scrollbarY):null,i.railBorderYWidth=s.toInt(u.css(i.scrollbarYRail,"borderTopWidth"))+s.toInt(u.css(i.scrollbarYRail,"borderBottomWidth")),u.css(i.scrollbarYRail,"display","block"),i.railYMarginHeight=s.toInt(u.css(i.scrollbarYRail,"marginTop"))+s.toInt(u.css(i.scrollbarYRail,"marginBottom")),u.css(i.scrollbarYRail,"display",""),i.railYHeight=null,i.railYRatio=null}function o(t){return t.getAttribute("data-ps-id")}function a(t,e){t.setAttribute("data-ps-id",e)}function r(t){t.removeAttribute("data-ps-id")}var s=t("../lib/helper"),l=t("../lib/class"),c=t("./default-setting"),u=t("../lib/dom"),d=t("../lib/event-manager"),h=t("../lib/guid"),p={};n.add=function(t){var e=h();return a(t,e),p[e]=new i(t),p[e]},n.remove=function(t){delete p[o(t)],r(t)},n.get=function(t){return p[o(t)]}},{"../lib/class":2,"../lib/dom":3,"../lib/event-manager":4,"../lib/guid":5,
"../lib/helper":6,"./default-setting":8}],19:[function(t,e,n){"use strict";function i(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}function o(t,e){var n={width:e.railXWidth};e.isRtl?n.left=e.negativeScrollAdjustment+t.scrollLeft+e.containerWidth-e.contentWidth:n.left=t.scrollLeft,e.isScrollbarXUsingBottom?n.bottom=e.scrollbarXBottom-t.scrollTop:n.top=e.scrollbarXTop+t.scrollTop,s.css(e.scrollbarXRail,n);var i={top:t.scrollTop,height:e.railYHeight};e.isScrollbarYUsingRight?e.isRtl?i.right=e.contentWidth-(e.negativeScrollAdjustment+t.scrollLeft)-e.scrollbarYRight-e.scrollbarYOuterWidth:i.right=e.scrollbarYRight-t.scrollLeft:e.isRtl?i.left=e.negativeScrollAdjustment+t.scrollLeft+2*e.containerWidth-e.contentWidth-e.scrollbarYLeft-e.scrollbarYOuterWidth:i.left=e.scrollbarYLeft+t.scrollLeft,s.css(e.scrollbarYRail,i),s.css(e.scrollbarX,{left:e.scrollbarXLeft,width:e.scrollbarXWidth-e.railBorderXWidth}),s.css(e.scrollbarY,{top:e.scrollbarYTop,height:e.scrollbarYHeight-e.railBorderYWidth})}var a=t("../lib/helper"),r=t("../lib/class"),s=t("../lib/dom"),l=t("./instances"),c=t("./update-scroll");e.exports=function(t){var e=l.get(t);e.containerWidth=t.clientWidth,e.containerHeight=t.clientHeight,e.contentWidth=t.scrollWidth,e.contentHeight=t.scrollHeight;var n;t.contains(e.scrollbarXRail)||(n=s.queryChildren(t,".ps__scrollbar-x-rail"),n.length>0&&n.forEach(function(t){s.remove(t)}),s.appendTo(e.scrollbarXRail,t)),t.contains(e.scrollbarYRail)||(n=s.queryChildren(t,".ps__scrollbar-y-rail"),n.length>0&&n.forEach(function(t){s.remove(t)}),s.appendTo(e.scrollbarYRail,t)),!e.settings.suppressScrollX&&e.containerWidth+e.settings.scrollXMarginOffset<e.contentWidth?(e.scrollbarXActive=!0,e.railXWidth=e.containerWidth-e.railXMarginWidth,e.railXRatio=e.containerWidth/e.railXWidth,e.scrollbarXWidth=i(e,a.toInt(e.railXWidth*e.containerWidth/e.contentWidth)),e.scrollbarXLeft=a.toInt((e.negativeScrollAdjustment+t.scrollLeft)*(e.railXWidth-e.scrollbarXWidth)/(e.contentWidth-e.containerWidth))):e.scrollbarXActive=!1,!e.settings.suppressScrollY&&e.containerHeight+e.settings.scrollYMarginOffset<e.contentHeight?(e.scrollbarYActive=!0,e.railYHeight=e.containerHeight-e.railYMarginHeight,e.railYRatio=e.containerHeight/e.railYHeight,e.scrollbarYHeight=i(e,a.toInt(e.railYHeight*e.containerHeight/e.contentHeight)),e.scrollbarYTop=a.toInt(t.scrollTop*(e.railYHeight-e.scrollbarYHeight)/(e.contentHeight-e.containerHeight))):e.scrollbarYActive=!1,e.scrollbarXLeft>=e.railXWidth-e.scrollbarXWidth&&(e.scrollbarXLeft=e.railXWidth-e.scrollbarXWidth),e.scrollbarYTop>=e.railYHeight-e.scrollbarYHeight&&(e.scrollbarYTop=e.railYHeight-e.scrollbarYHeight),o(t,e),e.scrollbarXActive?r.add(t,"ps--active-x"):(r.remove(t,"ps--active-x"),e.scrollbarXWidth=0,e.scrollbarXLeft=0,c(t,"left",0)),e.scrollbarYActive?r.add(t,"ps--active-y"):(r.remove(t,"ps--active-y"),e.scrollbarYHeight=0,e.scrollbarYTop=0,c(t,"top",0))}},{"../lib/class":2,"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-scroll":20}],20:[function(t,e,n){"use strict";var i=t("./instances"),o=function(t){var e=document.createEvent("Event");return e.initEvent(t,!0,!0),e};e.exports=function(t,e,n){if(void 0===t)throw"You must provide an element to the update-scroll function";if(void 0===e)throw"You must provide an axis to the update-scroll function";if(void 0===n)throw"You must provide a value to the update-scroll function";"top"===e&&n<=0&&(t.scrollTop=n=0,t.dispatchEvent(o("ps-y-reach-start"))),"left"===e&&n<=0&&(t.scrollLeft=n=0,t.dispatchEvent(o("ps-x-reach-start")));var a=i.get(t);"top"===e&&n>=a.contentHeight-a.containerHeight&&(n=a.contentHeight-a.containerHeight,n-t.scrollTop<=1?n=t.scrollTop:t.scrollTop=n,t.dispatchEvent(o("ps-y-reach-end"))),"left"===e&&n>=a.contentWidth-a.containerWidth&&(n=a.contentWidth-a.containerWidth,n-t.scrollLeft<=1?n=t.scrollLeft:t.scrollLeft=n,t.dispatchEvent(o("ps-x-reach-end"))),void 0===a.lastTop&&(a.lastTop=t.scrollTop),void 0===a.lastLeft&&(a.lastLeft=t.scrollLeft),"top"===e&&n<a.lastTop&&t.dispatchEvent(o("ps-scroll-up")),"top"===e&&n>a.lastTop&&t.dispatchEvent(o("ps-scroll-down")),"left"===e&&n<a.lastLeft&&t.dispatchEvent(o("ps-scroll-left")),"left"===e&&n>a.lastLeft&&t.dispatchEvent(o("ps-scroll-right")),"top"===e&&n!==a.lastTop&&(t.scrollTop=a.lastTop=n,t.dispatchEvent(o("ps-scroll-y"))),"left"===e&&n!==a.lastLeft&&(t.scrollLeft=a.lastLeft=n,t.dispatchEvent(o("ps-scroll-x")))}},{"./instances":18}],21:[function(t,e,n){"use strict";var i=t("../lib/helper"),o=t("../lib/dom"),a=t("./instances"),r=t("./update-geometry"),s=t("./update-scroll");e.exports=function(t){var e=a.get(t);e&&(e.negativeScrollAdjustment=e.isNegativeScroll?t.scrollWidth-t.clientWidth:0,o.css(e.scrollbarXRail,"display","block"),o.css(e.scrollbarYRail,"display","block"),e.railXMarginWidth=i.toInt(o.css(e.scrollbarXRail,"marginLeft"))+i.toInt(o.css(e.scrollbarXRail,"marginRight")),e.railYMarginHeight=i.toInt(o.css(e.scrollbarYRail,"marginTop"))+i.toInt(o.css(e.scrollbarYRail,"marginBottom")),o.css(e.scrollbarXRail,"display","none"),o.css(e.scrollbarYRail,"display","none"),r(t),s(t,"top",t.scrollTop),s(t,"left",t.scrollLeft),o.css(e.scrollbarXRail,"display",""),o.css(e.scrollbarYRail,"display",""))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-geometry":19,"./update-scroll":20}]},{},[1]),function(t){var e=!1,n={data:[],placeholder:"",secondaryPlaceholder:""};t(document).ready(function(){t(document).on("click",".chip .close",function(e){var n=t(this);n.closest(".chips").data("initialized")||n.closest(".chip").remove()})}),t.fn.material_chip=function(i){var o=this;return this.$el=t(this),this.$document=t(document),this.SELS={CHIPS:".chips",CHIP:".chip",INPUT:"input",DELETE:".fa",SELECTED_CHIP:".selected"},"data"===i?this.$el.data("chips"):"options"===i?this.$el.data("options"):(this.$el.data("options",t.extend({},n,i)),this.init=function(){var e=0;o.$el.each(function(){var n=t(this);if(!n.data("initialized")){var i=n.data("options");(!i.data||!i.data instanceof Array)&&(i.data=[]),n.data("chips",i.data),n.data("index",e),n.data("initialized",!0),n.hasClass(o.SELS.CHIPS)||n.addClass("chips"),o.chips(n),e++}})},this.handleEvents=function(){var e=o.SELS;o.$document.on("click",e.CHIPS,function(n){t(n.target).find(e.INPUT).focus()}),o.$document.on("click",e.CHIP,function(n){t(e.CHIP).removeClass("selected"),t(this).toggleClass("selected")}),o.$document.on("keydown",function(n){if(!t(n.target).is("input, textarea")){var i,a=o.$document.find(e.CHIP+e.SELECTED_CHIP),r=a.closest(e.CHIPS),s=a.siblings(e.CHIP).length;if(a.length){var l=8===n.which||46===n.which,c=37===n.which,u=39===n.which;if(l){n.preventDefault();var d=r.data("index");i=a.index(),o.deleteChip(d,i,r);var h=null;i+1<s?h=i:i!==s&&i+1!==s||(h=s-1),h<0&&(h=null),null!==h&&o.selectChip(d,h,r),s||r.find("input").focus()}else if(c){if((i=a.index()-1)<0)return;t(e.CHIP).removeClass("selected"),o.selectChip(r.data("index"),i,r)}else if(u){if(i=a.index()+1,t(e.CHIP).removeClass("selected"),i>s)return void r.find("input").focus();o.selectChip(r.data("index"),i,r)}}}}),o.$document.on("focusin",e.CHIPS+" "+e.INPUT,function(n){t(n.target).closest(e.CHIPS).addClass("focus"),t(e.CHIP).removeClass("selected")}),o.$document.on("focusout",e.CHIPS+" "+e.INPUT,function(n){t(n.target).closest(e.CHIPS).removeClass("focus")}),o.$document.on("keydown",e.CHIPS+" "+e.INPUT,function(n){var i=t(n.target),a=i.closest(e.CHIPS),r=a.data("index"),s=a.children(e.CHIP).length;if(13===n.which)return n.preventDefault(),o.addChip(r,{tag:i.val()},a),void i.val("");var l=8===n.keyCode||37===n.keyCode,c=""===i.val();return l&&c&&s?(o.selectChip(r,s-1,a),void i.blur()):void 0}),o.$document.on("click",e.CHIPS+" "+e.DELETE,function(n){var i=t(n.target),a=i.closest(e.CHIPS),r=i.closest(e.CHIP);n.stopPropagation(),o.deleteChip(a.data("index"),r.index(),a),a.find("input").focus()})},this.chips=function(t){var e="";t.data("options");t.data("chips").forEach(function(t){e+=o.renderChip(t)}),e+='<input class="input" placeholder="">',t.html(e),o.setPlaceholder(t)},this.renderChip=function(t){if(t.tag){var e='<div class="chip">'+t.tag;return t.image&&(e+=' <img src="'+t.image+'"> '),e+='<i class="close fa fa-times"></i>',e+="</div>"}},this.setPlaceholder=function(t){var e=t.data("options");t.data("chips").length&&e.placeholder?t.find("input").prop("placeholder",e.placeholder):!t.data("chips").length&&e.secondaryPlaceholder&&t.find("input").prop("placeholder",e.secondaryPlaceholder)},this.isValid=function(t,e){for(var n=t.data("chips"),i=!1,o=0;o<n.length;o++)if(n[o].tag===e.tag)return void(i=!0);return""!==e.tag&&!i},this.addChip=function(e,n,i){if(o.isValid(i,n)){var a=(i.data("options"),o.renderChip(n));i.data("chips").push(n),t(a).insertBefore(i.find("input")),i.trigger("chip.add",n),o.setPlaceholder(i)}},this.deleteChip=function(t,e,n){var i=n.data("chips")[e];n.find(".chip").eq(e).remove(),n.data("chips").splice(e,1),n.trigger("chip.delete",i),o.setPlaceholder(n)},this.selectChip=function(t,e,n){var i=n.find(".chip").eq(e);i&&!1===i.hasClass("selected")&&(i.addClass("selected"),n.trigger("chip.select",n.data("chips")[e]))},this.getChipsElement=function(t,e){return e.eq(t)},this.init(),void(e||(this.handleEvents(),e=!0)))}}(jQuery),function(t){"use strict";function e(t){var e=["O","Moz","ms","Ms","Webkit"],n=e.length;if(void 0!==s.style[t])return!0;for(t=t.charAt(0).toUpperCase()+t.substr(1);--n>-1&&void 0===s.style[e[n]+t];);return n>=0}function n(){a=t.innerWidth||document.documentElement.clientWidth,r=t.innerHeight||document.documentElement.clientHeight}function i(t,e,n){t.addEventListener?t.addEventListener(e,n):t.attachEvent("on"+e,function(){n.call(t)})}function o(e){t.requestAnimationFrame(function(){"scroll"!==e.type&&n();for(var t=0,i=g.length;t<i;t++)"scroll"!==e.type&&(g[t].coverImage(),g[t].clipContainer()),g[t].onScroll()})}Date.now||(Date.now=function(){return(new Date).getTime()}),t.requestAnimationFrame||function(){for(var e=["webkit","moz"],n=0;n<e.length&&!t.requestAnimationFrame;++n){var i=e[n];t.requestAnimationFrame=t[i+"RequestAnimationFrame"],t.cancelAnimationFrame=t[i+"CancelAnimationFrame"]||t[i+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(t.navigator.userAgent)||!t.requestAnimationFrame||!t.cancelAnimationFrame){var o=0;t.requestAnimationFrame=function(t){var e=Date.now(),n=Math.max(o+16,e);return setTimeout(function(){t(o=n)},n-e)},t.cancelAnimationFrame=clearTimeout}}();var a,r,s=document.createElement("div"),l=e("transform"),c=e("perspective"),u=navigator.userAgent,d=u.toLowerCase().indexOf("android")>-1,h=/iPad|iPhone|iPod/.test(u)&&!t.MSStream,p=u.toLowerCase().indexOf("firefox")>-1,f=u.indexOf("MSIE ")>-1||u.indexOf("Trident/")>-1||u.indexOf("Edge/")>-1,m=document.all&&!t.atob;n();var g=[],v=function(){function t(t,n){var i,o=this;if(o.$item=t,o.defaults={type:"scroll",speed:.5,imgSrc:null,imgWidth:null,imgHeight:null,elementInViewport:null,zIndex:-100,noAndroid:!1,noIos:!0,onScroll:null,onInit:null,onDestroy:null,onCoverImage:null},i=JSON.parse(o.$item.getAttribute("data-jarallax")||"{}"),o.options=o.extend({},o.defaults,i,n),!(!l||d&&o.options.noAndroid||h&&o.options.noIos)){o.options.speed=Math.min(2,Math.max(-1,parseFloat(o.options.speed)));var a=o.options.elementInViewport;a&&"object"==typeof a&&void 0!==a.length&&(a=a[0]),!a instanceof Element&&(a=null),o.options.elementInViewport=a,o.instanceID=e++,o.image={src:o.options.imgSrc||null,$container:null,$item:null,width:o.options.imgWidth||null,height:o.options.imgHeight||null,useImgTag:h||d||f,position:!c||p?"absolute":"fixed"},o.initImg()&&o.init()}}var e=0;return t}();v.prototype.css=function(e,n){if("string"==typeof n)return t.getComputedStyle?t.getComputedStyle(e).getPropertyValue(n):e.style[n];n.transform&&(c&&(n.transform+=" translateZ(0)"),n.WebkitTransform=n.MozTransform=n.msTransform=n.OTransform=n.transform);for(var i in n)e.style[i]=n[i];return e},v.prototype.extend=function(t){t=t||{};for(var e=1;e<arguments.length;e++)if(arguments[e])for(var n in arguments[e])arguments[e].hasOwnProperty(n)&&(t[n]=arguments[e][n]);return t},v.prototype.initImg=function(){var t=this;return null===t.image.src&&(t.image.src=t.css(t.$item,"background-image").replace(/^url\(['"]?/g,"").replace(/['"]?\)$/g,"")),!(!t.image.src||"none"===t.image.src)},v.prototype.init=function(){function t(){e.coverImage(),e.clipContainer(),e.onScroll(!0),e.options.onInit&&e.options.onInit.call(e),setTimeout(function(){e.$item&&e.css(e.$item,{"background-image":"none","background-attachment":"scroll","background-size":"auto"})},0)}var e=this,n={position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",pointerEvents:"none"},i={};e.$item.setAttribute("data-jarallax-original-styles",e.$item.getAttribute("style")),"static"===e.css(e.$item,"position")&&e.css(e.$item,{position:"relative"}),"auto"===e.css(e.$item,"z-index")&&e.css(e.$item,{zIndex:0}),e.image.$container=document.createElement("div"),e.css(e.image.$container,n),e.css(e.image.$container,{visibility:"hidden","z-index":e.options.zIndex}),e.image.$container.setAttribute("id","jarallax-container-"+e.instanceID),e.$item.appendChild(e.image.$container),e.image.useImgTag?(e.image.$item=document.createElement("img"),e.image.$item.setAttribute("src",e.image.src),i=e.extend({"max-width":"none"},n,i)):(e.image.$item=document.createElement("div"),i=e.extend({"background-position":"50% 50%","background-size":"100% auto","background-repeat":"no-repeat no-repeat","background-image":'url("'+e.image.src+'")'},n,i));for(var o=0,a=e.$item;null!==a&&a!==document&&0===o;){var r=e.css(a,"-webkit-transform")||e.css(a,"-moz-transform")||e.css(a,"transform");r&&"none"!==r&&(o=1,e.css(e.image.$container,{transform:"translateX(0) translateY(0)"})),a=a.parentNode}(o||"opacity"===e.options.type||"scale"===e.options.type||"scale-opacity"===e.options.type)&&(e.image.position="absolute"),i.position=e.image.position,e.css(e.image.$item,i),e.image.$container.appendChild(e.image.$item),e.image.width&&e.image.height?t():e.getImageSize(e.image.src,function(n,i){e.image.width=n,e.image.height=i,t()}),g.push(e)},v.prototype.destroy=function(){for(var t=this,e=0,n=g.length;e<n;e++)if(g[e].instanceID===t.instanceID){g.splice(e,1);break}var i=t.$item.getAttribute("data-jarallax-original-styles");t.$item.removeAttribute("data-jarallax-original-styles"),"null"===i?t.$item.removeAttribute("style"):t.$item.setAttribute("style",i),t.$clipStyles&&t.$clipStyles.parentNode.removeChild(t.$clipStyles),t.image.$container.parentNode.removeChild(t.image.$container),t.options.onDestroy&&t.options.onDestroy.call(t),delete t.$item.jarallax;for(var o in t)delete t[o]},v.prototype.getImageSize=function(t,e){if(t&&e){var n=new Image;n.onload=function(){e(n.width,n.height)},n.src=t}},v.prototype.clipContainer=function(){if(!m){var t=this,e=t.image.$container.getBoundingClientRect(),n=e.width,i=e.height;if(!t.$clipStyles){t.$clipStyles=document.createElement("style"),t.$clipStyles.setAttribute("type","text/css"),t.$clipStyles.setAttribute("id","#jarallax-clip-"+t.instanceID);(document.head||document.getElementsByTagName("head")[0]).appendChild(t.$clipStyles)}var o=["#jarallax-container-"+t.instanceID+" {","   clip: rect(0 "+n+"px "+i+"px 0);","   clip: rect(0, "+n+"px, "+i+"px, 0);","}"].join("\n");t.$clipStyles.styleSheet?t.$clipStyles.styleSheet.cssText=o:t.$clipStyles.innerHTML=o}},v.prototype.coverImage=function(){var t=this;if(t.image.width&&t.image.height){var e=t.image.$container.getBoundingClientRect(),n=e.width,i=e.height,o=e.left,a=t.image.width,s=t.image.height,l=t.options.speed,c="scroll"===t.options.type||"scroll-opacity"===t.options.type,u=0,d=0,h=i,p=0,f=0;c&&(u=l<0?l*Math.max(i,r):l*(i+r),l>1?h=Math.abs(u-r):l<0?h=u/l+Math.abs(u):h+=Math.abs(r-i)*(1-l),u/=2),d=h*a/s,d<n&&(d=n,h=d*s/a),c?(p=o+(n-d)/2,f=(r-h)/2):(p=(n-d)/2,f=(i-h)/2),"absolute"===t.image.position&&(p-=o),t.parallaxScrollDistance=u,t.css(t.image.$item,{width:d+"px",height:h+"px",marginLeft:p+"px",marginTop:f+"px"}),t.options.onCoverImage&&t.options.onCoverImage.call(t)}},v.prototype.isVisible=function(){return this.isElementInViewport||!1},v.prototype.onScroll=function(t){var e=this;if(e.image.width&&e.image.height){var n=e.$item.getBoundingClientRect(),i=n.top,o=n.height,s={visibility:"visible",backgroundPosition:"50% 50%"},l=n;if(e.options.elementInViewport&&(l=e.options.elementInViewport.getBoundingClientRect()),e.isElementInViewport=l.bottom>=0&&l.right>=0&&l.top<=r&&l.left<=a,t||e.isElementInViewport){var c=Math.max(0,i),u=Math.max(0,o+i),d=Math.max(0,-i),h=Math.max(0,i+o-r),p=Math.max(0,o-(i+o-r)),f=Math.max(0,-i+r-o),m=1-2*(r-i)/(r+o),g=1;if(o<r?g=1-(d||h)/o:u<=r?g=u/r:p<=r&&(g=p/r),"opacity"!==e.options.type&&"scale-opacity"!==e.options.type&&"scroll-opacity"!==e.options.type||(s.transform="",s.opacity=g),"scale"===e.options.type||"scale-opacity"===e.options.type){var v=1;e.options.speed<0?v-=e.options.speed*g:v+=e.options.speed*(1-g),s.transform="scale("+v+")"}if("scroll"===e.options.type||"scroll-opacity"===e.options.type){var y=e.parallaxScrollDistance*m;"absolute"===e.image.position&&(y-=i),s.transform="translateY("+y+"px)"}e.css(e.image.$item,s),e.options.onScroll&&e.options.onScroll.call(e,{section:n,beforeTop:c,beforeTopEnd:u,afterTop:d,beforeBottom:h,beforeBottomEnd:p,afterBottom:f,visiblePercent:g,fromViewportCenter:m})}}},i(t,"scroll",o),i(t,"resize",o),i(t,"orientationchange",o),i(t,"load",o);var y=function(t){("object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName)&&(t=[t]);var e,n=arguments[1],i=Array.prototype.slice.call(arguments,2),o=t.length,a=0;for(a;a<o;a++)if("object"==typeof n||void 0===n?t[a].jarallax||(t[a].jarallax=new v(t[a],n)):t[a].jarallax&&(e=t[a].jarallax[n].apply(t[a].jarallax,i)),void 0!==e)return e;return t};y.constructor=v;var b=t.jarallax;if(t.jarallax=y,t.jarallax.noConflict=function(){return t.jarallax=b,this},"undefined"!=typeof jQuery){var x=function(){var e=arguments||[];Array.prototype.unshift.call(e,this);var n=y.apply(t,e);return"object"!=typeof n?n:this};x.constructor=v;var w=jQuery.fn.jarallax;jQuery.fn.jarallax=x,jQuery.fn.jarallax.noConflict=function(){return jQuery.fn.jarallax=w,this}}i(t,"DOMContentLoaded",function(){y(document.querySelectorAll("[data-jarallax], [data-jarallax-video]"))})}(window),function(t){"use strict";function e(t){t=t||{};for(var e=1;e<arguments.length;e++)if(arguments[e])for(var n in arguments[e])arguments[e].hasOwnProperty(n)&&(t[n]=arguments[e][n]);return t}function n(){this._done=[],this._fail=[]}function i(t,e,n){t.addEventListener?t.addEventListener(e,n):t.attachEvent("on"+e,function(){n.call(t)})}n.prototype={execute:function(t,e){var n=t.length;for(e=Array.prototype.slice.call(e);n--;)t[n].apply(null,e)},resolve:function(){this.execute(this._done,arguments)},reject:function(){this.execute(this._fail,arguments)},done:function(t){this._done.push(t)},fail:function(t){this._fail.push(t)}};var o=function(){function t(t,i){var o=this;o.url=t,o.options_default={autoplay:1,loop:1,mute:1,controls:0,startTime:0,endTime:0},o.options=e({},o.options_default,i),o.videoID=o.parseURL(t),o.videoID&&(o.ID=n++,o.loadAPI(),o.init())}var n=0;return t}();o.prototype.parseURL=function(t){var e=function(t){var e=t.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/);return!(!e||11!==e[1].length)&&e[1]}(t),n=function(t){var e=t.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);return!(!e||!e[3])&&e[3]}(t),i=function(t){for(var e=t.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/),n={},i=0,o=0;o<e.length;o++){var a=e[o].match(/^(mp4|webm|ogv|ogg)\:(.*)/);a&&a[1]&&a[2]&&(n["ogv"===a[1]?"ogg":a[1]]=a[2],i=1)}return!!i&&n}(t);return e?(this.type="youtube",e):n?(this.type="vimeo",n):!!i&&(this.type="local",i)},o.prototype.isValid=function(){return!!this.videoID},o.prototype.on=function(t,e){this.userEventsList=this.userEventsList||[],(this.userEventsList[t]||(this.userEventsList[t]=[])).push(e)},o.prototype.off=function(t,e){if(this.userEventsList&&this.userEventsList[t])if(e)for(var n=0;n<this.userEventsList[t].length;n++)this.userEventsList[t][n]===e&&(this.userEventsList[t][n]=!1);else delete this.userEventsList[t]},o.prototype.fire=function(t){var e=[].slice.call(arguments,1);if(this.userEventsList&&void 0!==this.userEventsList[t])for(var n in this.userEventsList[t])this.userEventsList[t][n]&&this.userEventsList[t][n].apply(this,e)},o.prototype.play=function(t){var e=this;e.player&&("youtube"===e.type&&e.player.playVideo&&(void 0!==t&&e.player.seekTo(t||0),e.player.playVideo()),"vimeo"===e.type&&(void 0!==t&&e.player.setCurrentTime(t),e.player.getPaused().then(function(t){t&&e.player.play()})),"local"===e.type&&(void 0!==t&&(e.player.currentTime=t),e.player.play()))},o.prototype.pause=function(){this.player&&("youtube"===this.type&&this.player.pauseVideo&&this.player.pauseVideo(),"vimeo"===this.type&&this.player.pause(),"local"===this.type&&this.player.pause())},o.prototype.getImageURL=function(t){var e=this;if(e.videoImage)return void t(e.videoImage);if("youtube"===e.type){var n=["maxresdefault","sddefault","hqdefault","0"],i=0,o=new Image;o.onload=function(){120!==(this.naturalWidth||this.width)||i===n.length-1?(e.videoImage="https://img.youtube.com/vi/"+e.videoID+"/"+n[i]+".jpg",t(e.videoImage)):(i++,this.src="https://img.youtube.com/vi/"+e.videoID+"/"+n[i]+".jpg")},o.src="https://img.youtube.com/vi/"+e.videoID+"/"+n[i]+".jpg"}if("vimeo"===e.type){var a=new XMLHttpRequest;a.open("GET","https://vimeo.com/api/v2/video/"+e.videoID+".json",!0),a.onreadystatechange=function(){if(4===this.readyState&&this.status>=200&&this.status<400){var n=JSON.parse(this.responseText);e.videoImage=n[0].thumbnail_large,t(e.videoImage)}},a.send(),a=null}},o.prototype.getIframe=function(e){var n=this;if(n.$iframe)return void e(n.$iframe);n.onAPIready(function(){var o;if(n.$iframe||(o=document.createElement("div"),o.style.display="none"),"youtube"===n.type){n.playerOptions={},n.playerOptions.videoId=n.videoID,n.playerOptions.playerVars={autohide:1,rel:0,autoplay:0},n.options.controls||(n.playerOptions.playerVars.iv_load_policy=3,n.playerOptions.playerVars.modestbranding=1,n.playerOptions.playerVars.controls=0,n.playerOptions.playerVars.showinfo=0,n.playerOptions.playerVars.disablekb=1);var a,r;n.playerOptions.events={onReady:function(t){n.options.mute&&t.target.mute(),n.options.autoplay&&n.play(n.options.startTime),n.fire("ready",t)},onStateChange:function(t){n.options.loop&&t.data===YT.PlayerState.ENDED&&n.play(n.options.startTime),a||t.data!==YT.PlayerState.PLAYING||(a=1,n.fire("started",t)),t.data===YT.PlayerState.PLAYING&&n.fire("play",t),t.data===YT.PlayerState.PAUSED&&n.fire("pause",t),t.data===YT.PlayerState.ENDED&&n.fire("end",t),n.options.endTime&&(t.data===YT.PlayerState.PLAYING?r=setInterval(function(){n.options.endTime&&n.player.getCurrentTime()>=n.options.endTime&&(n.options.loop?n.play(n.options.startTime):n.pause())},150):clearInterval(r))}};var s=!n.$iframe;if(s){var l=document.createElement("div");l.setAttribute("id",n.playerID),o.appendChild(l),document.body.appendChild(o)}n.player=n.player||new t.YT.Player(n.playerID,n.playerOptions),s&&(n.$iframe=document.getElementById(n.playerID),n.videoWidth=parseInt(n.$iframe.getAttribute("width"),10)||1280,n.videoHeight=parseInt(n.$iframe.getAttribute("height"),10)||720)}if("vimeo"===n.type){n.playerOptions="",n.playerOptions+="player_id="+n.playerID,n.playerOptions+="&autopause=0",n.options.controls||(n.playerOptions+="&badge=0&byline=0&portrait=0&title=0"),n.playerOptions+="&autoplay="+(n.options.autoplay?"1":"0"),n.playerOptions+="&loop="+(n.options.loop?1:0),n.$iframe||(n.$iframe=document.createElement("iframe"),n.$iframe.setAttribute("id",n.playerID),n.$iframe.setAttribute("src","https://player.vimeo.com/video/"+n.videoID+"?"+n.playerOptions),n.$iframe.setAttribute("frameborder","0"),o.appendChild(n.$iframe),document.body.appendChild(o)),n.player=n.player||new Vimeo.Player(n.$iframe),n.player.getVideoWidth().then(function(t){n.videoWidth=t||1280}),n.player.getVideoHeight().then(function(t){n.videoHeight=t||720}),n.player.setVolume(n.options.mute?0:100);var c;n.player.on("timeupdate",function(t){c||n.fire("started",t),c=1,n.options.endTime&&n.options.endTime&&t.seconds>=n.options.endTime&&(n.options.loop?n.play(n.options.startTime):n.pause())}),n.player.on("play",function(t){n.fire("play",t),n.options.startTime&&0===t.seconds&&n.play(n.options.startTime)}),n.player.on("pause",function(t){n.fire("pause",t)}),n.player.on("ended",function(t){n.fire("end",t)}),n.player.on("loaded",function(t){n.fire("ready",t)})}if("local"===n.type){if(!n.$iframe){n.$iframe=document.createElement("video"),n.options.mute&&(n.$iframe.muted=!0),n.options.loop&&(n.$iframe.loop=!0),n.$iframe.setAttribute("id",n.playerID),o.appendChild(n.$iframe),document.body.appendChild(o);for(var u in n.videoID)!function(t,e,n){var i=document.createElement("source");i.src=e,i.type=n,t.appendChild(i)}(n.$iframe,n.videoID[u],"video/"+u)}n.player=n.player||n.$iframe;var d;i(n.player,"playing",function(t){d||n.fire("started",t),d=1}),i(n.player,"timeupdate",function(){n.options.endTime&&n.options.endTime&&this.currentTime>=n.options.endTime&&(n.options.loop?n.play(n.options.startTime):n.pause())}),i(n.player,"play",function(t){n.fire("play",t)}),i(n.player,"pause",function(t){n.fire("pause",t)}),i(n.player,"ended",function(t){n.fire("end",t)}),i(n.player,"loadedmetadata",function(){n.videoWidth=this.videoWidth||1280,n.videoHeight=this.videoHeight||720,n.fire("ready"),n.options.autoplay&&n.play(n.options.startTime)})}e(n.$iframe)})},o.prototype.init=function(){var t=this;t.playerID="VideoWorker-"+t.ID};var a=0,r=0;o.prototype.loadAPI=function(){var e=this;if(!a||!r){var n="";if("youtube"!==e.type||a||(a=1,n="//www.youtube.com/iframe_api"),"vimeo"!==e.type||r||(r=1,n="//player.vimeo.com/api/player.js"),n){"file://"===t.location.origin&&(n="http:"+n);var i=document.createElement("script"),o=document.getElementsByTagName("head")[0];i.src=n,o.appendChild(i),o=null,i=null}}};var s=0,l=0,c=new n,u=new n;o.prototype.onAPIready=function(e){var n=this;if("youtube"===n.type&&("undefined"!=typeof YT&&0!==YT.loaded||s?"object"==typeof YT&&1===YT.loaded?e():c.done(function(){e()}):(s=1,t.onYouTubeIframeAPIReady=function(){t.onYouTubeIframeAPIReady=null,c.resolve("done"),e()})),"vimeo"===n.type)if("undefined"!=typeof Vimeo||l)"undefined"!=typeof Vimeo?e():u.done(function(){e()});else{l=1;var i=setInterval(function(){"undefined"!=typeof Vimeo&&(clearInterval(i),u.resolve("done"),e())},20)}"local"===n.type&&e()},t.VideoWorker=o}(window),function(){"use strict";if("undefined"!=typeof jarallax){var t=jarallax.constructor,e=t.prototype.init;t.prototype.init=function(){var t=this;e.apply(t),t.video&&t.video.getIframe(function(e){var n=e.parentNode;t.css(e,{position:t.image.position,top:"0px",left:"0px",right:"0px",bottom:"0px",width:"100%",height:"100%",maxWidth:"none",maxHeight:"none",visibility:"hidden",margin:0,zIndex:-1}),t.$video=e,t.image.$container.appendChild(e),n.parentNode.removeChild(n)})};var n=t.prototype.coverImage;t.prototype.coverImage=function(){var t=this;n.apply(t),t.video&&"IFRAME"===t.image.$item.nodeName&&t.css(t.image.$item,{height:t.image.$item.getBoundingClientRect().height+400+"px",marginTop:-200+parseFloat(t.css(t.image.$item,"margin-top"))+"px"})};var i=t.prototype.initImg;t.prototype.initImg=function(){var t=this,e=i.apply(t);if(t.options.videoSrc||(t.options.videoSrc=t.$item.getAttribute("data-jarallax-video")||!1),t.options.videoSrc){var n=new VideoWorker(t.options.videoSrc,{startTime:t.options.videoStartTime||0,endTime:t.options.videoEndTime||0});if(n.isValid()&&(t.image.useImgTag=!0,n.on("ready",function(){var e=t.onScroll;t.onScroll=function(){e.apply(t),t.isVisible()?n.play():n.pause()}}),n.on("started",function(){t.image.$default_item=t.image.$item,t.image.$item=t.$video,t.image.width=t.options.imgWidth=t.video.videoWidth||1280,t.image.height=t.options.imgHeight=t.video.videoHeight||720,t.coverImage(),t.clipContainer(),t.onScroll(),t.image.$default_item&&(t.image.$default_item.style.display="none")}),t.video=n,"local"!==n.type&&n.getImageURL(function(e){t.image.src=e,t.init()})),"local"!==n.type)return!1;if(!e)return t.image.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",!0}return e};var o=t.prototype.destroy;t.prototype.destroy=function(){var t=this;o.apply(t)}}}(),$.fn.mdb_autocomplete=function(t){var e={data:{}};return t=$.extend(e,t),this.each(function(){var e=$(this),n=t.data;if(Object.keys(n).length){var i=$('<ul class="mdb-autocomplete-wrap"></ul>');i.insertAfter($(this))}e.on("keyup",function(t){var o=e.val();if(i.empty(),o.length)for(var a in n)if(n[a].toLowerCase().indexOf(o.toLowerCase())!==-1){var r=$("<li>"+n[a]+"</li>");i.append(r)}13==t.which&&(i.children(":first").trigger("click"),i.empty()),0==o.length?$(".mdb-autocomplete-clear").css("visibility","hidden"):$(".mdb-autocomplete-clear").css("visibility","visible")}),i.on("click","li",function(){e.val($(this).text()),i.empty()}),$(".mdb-autocomplete-clear").on("click",function(t){t.preventDefault(),e.val(""),$(this).css("visibility","hidden"),i.empty(),$(this).parent().find("label").removeClass("active")})})};

function dropdownEffectData(e){var t=null,n=null,i=$(e),o=$(".dropdown-menu",e),r=i.parents("ul.nav");return r.height>0&&(t=r.data("dropdown-in")||null,n=r.data("dropdown-out")||null),{target:e,dropdown:i,dropdownMenu:o,effectIn:o.data("dropdown-in")||t,effectOut:o.data("dropdown-out")||n}}function dropdownEffectStart(e,t){t&&(e.dropdown.addClass("dropdown-animating"),e.dropdownMenu.addClass("animated"),e.dropdownMenu.addClass(t))}function dropdownEffectEnd(e,t){e.dropdown.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){e.dropdown.removeClass("dropdown-animating"),e.dropdownMenu.removeClass("animated"),e.dropdownMenu.removeClass(e.effectIn),e.dropdownMenu.removeClass(e.effectOut),"function"==typeof t&&t()})}jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,t,n,i,o){return jQuery.easing[jQuery.easing.def](e,t,n,i,o)},easeInQuad:function(e,t,n,i,o){return i*(t/=o)*t+n},easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n},easeInOutQuad:function(e,t,n,i,o){return(t/=o/2)<1?i/2*t*t+n:-i/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,i,o){return i*(t/=o)*t*t+n},easeOutCubic:function(e,t,n,i,o){return i*((t=t/o-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,i,o){return(t/=o/2)<1?i/2*t*t*t+n:i/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,i,o){return i*(t/=o)*t*t*t+n},easeOutQuart:function(e,t,n,i,o){return-i*((t=t/o-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,i,o){return(t/=o/2)<1?i/2*t*t*t*t+n:-i/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,i,o){return i*(t/=o)*t*t*t*t+n},easeOutQuint:function(e,t,n,i,o){return i*((t=t/o-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,i,o){return(t/=o/2)<1?i/2*t*t*t*t*t+n:i/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,i,o){return-i*Math.cos(t/o*(Math.PI/2))+i+n},easeOutSine:function(e,t,n,i,o){return i*Math.sin(t/o*(Math.PI/2))+n},easeInOutSine:function(e,t,n,i,o){return-i/2*(Math.cos(Math.PI*t/o)-1)+n},easeInExpo:function(e,t,n,i,o){return 0==t?n:i*Math.pow(2,10*(t/o-1))+n},easeOutExpo:function(e,t,n,i,o){return t==o?n+i:i*(1-Math.pow(2,-10*t/o))+n},easeInOutExpo:function(e,t,n,i,o){return 0==t?n:t==o?n+i:(t/=o/2)<1?i/2*Math.pow(2,10*(t-1))+n:i/2*(2-Math.pow(2,-10*--t))+n},easeInCirc:function(e,t,n,i,o){return-i*(Math.sqrt(1-(t/=o)*t)-1)+n},easeOutCirc:function(e,t,n,i,o){return i*Math.sqrt(1-(t=t/o-1)*t)+n},easeInOutCirc:function(e,t,n,i,o){return(t/=o/2)<1?-i/2*(Math.sqrt(1-t*t)-1)+n:i/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,i,o){var r=1.70158,a=0,s=i;if(0==t)return n;if(1==(t/=o))return n+i;if(a||(a=.3*o),s<Math.abs(i)){s=i;var r=a/4}else var r=a/(2*Math.PI)*Math.asin(i/s);return-(s*Math.pow(2,10*(t-=1))*Math.sin((t*o-r)*(2*Math.PI)/a))+n},easeOutElastic:function(e,t,n,i,o){var r=1.70158,a=0,s=i;if(0==t)return n;if(1==(t/=o))return n+i;if(a||(a=.3*o),s<Math.abs(i)){s=i;var r=a/4}else var r=a/(2*Math.PI)*Math.asin(i/s);return s*Math.pow(2,-10*t)*Math.sin((t*o-r)*(2*Math.PI)/a)+i+n},easeInOutElastic:function(e,t,n,i,o){var r=1.70158,a=0,s=i;if(0==t)return n;if(2==(t/=o/2))return n+i;if(a||(a=o*(.3*1.5)),s<Math.abs(i)){s=i;var r=a/4}else var r=a/(2*Math.PI)*Math.asin(i/s);return t<1?-.5*(s*Math.pow(2,10*(t-=1))*Math.sin((t*o-r)*(2*Math.PI)/a))+n:s*Math.pow(2,-10*(t-=1))*Math.sin((t*o-r)*(2*Math.PI)/a)*.5+i+n},easeInBack:function(e,t,n,i,o,r){return void 0==r&&(r=1.70158),i*(t/=o)*t*((r+1)*t-r)+n},easeOutBack:function(e,t,n,i,o,r){return void 0==r&&(r=1.70158),i*((t=t/o-1)*t*((r+1)*t+r)+1)+n},easeInOutBack:function(e,t,n,i,o,r){return void 0==r&&(r=1.70158),(t/=o/2)<1?i/2*(t*t*((1+(r*=1.525))*t-r))+n:i/2*((t-=2)*t*((1+(r*=1.525))*t+r)+2)+n},easeInBounce:function(e,t,n,i,o){return i-jQuery.easing.easeOutBounce(e,o-t,0,i,o)+n},easeOutBounce:function(e,t,n,i,o){return(t/=o)<1/2.75?i*(7.5625*t*t)+n:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+n:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+n:i*(7.5625*(t-=2.625/2.75)*t+.984375)+n},easeInOutBounce:function(e,t,n,i,o){return t<o/2?.5*jQuery.easing.easeInBounce(e,2*t,0,i,o)+n:.5*jQuery.easing.easeOutBounce(e,2*t-o,0,i,o)+.5*i+n}}),function(e){e.Package?Materialize={}:e.Materialize={}}(window),Materialize.guid=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}}(),Materialize.elementOrParentIsFixed=function(e){var t=$(e),n=t.add(t.parents()),i=!1;return n.each(function(){if("fixed"===$(this).css("position"))return i=!0,!1}),i};var Vel;Vel=$?$.Velocity:jQuery?jQuery.Velocity:Velocity,jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(function(e){function t(e){var t=e.length,i=n.type(e);return"function"!==i&&!n.isWindow(e)&&(!(1!==e.nodeType||!t)||("array"===i||0===t||"number"==typeof t&&t>0&&t-1 in e))}if(!e.jQuery){var n=function(e,t){return new n.fn.init(e,t)};n.isWindow=function(e){return null!=e&&e==e.window},n.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?o[a.call(e)]||"object":typeof e},n.isArray=Array.isArray||function(e){return"array"===n.type(e)},n.isPlainObject=function(e){var t;if(!e||"object"!==n.type(e)||e.nodeType||n.isWindow(e))return!1;try{if(e.constructor&&!r.call(e,"constructor")&&!r.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(e){return!1}for(t in e);return void 0===t||r.call(e,t)},n.each=function(e,n,i){var o=0,r=e.length,a=t(e);if(i){if(a)for(;r>o&&n.apply(e[o],i)!==!1;o++);else for(o in e)if(n.apply(e[o],i)===!1)break}else if(a)for(;r>o&&n.call(e[o],o,e[o])!==!1;o++);else for(o in e)if(n.call(e[o],o,e[o])===!1)break;return e},n.data=function(e,t,o){if(void 0===o){var r=e[n.expando],a=r&&i[r];if(void 0===t)return a;if(a&&t in a)return a[t]}else if(void 0!==t){var r=e[n.expando]||(e[n.expando]=++n.uuid);return i[r]=i[r]||{},i[r][t]=o,o}},n.removeData=function(e,t){var o=e[n.expando],r=o&&i[o];r&&n.each(t,function(e,t){delete r[t]})},n.extend=function(){var e,t,i,o,r,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[l]||{},l++),"object"!=typeof s&&"function"!==n.type(s)&&(s={}),l===u&&(s=this,l--);u>l;l++)if(null!=(r=arguments[l]))for(o in r)e=s[o],i=r[o],s!==i&&(c&&i&&(n.isPlainObject(i)||(t=n.isArray(i)))?(t?(t=!1,a=e&&n.isArray(e)?e:[]):a=e&&n.isPlainObject(e)?e:{},s[o]=n.extend(c,a,i)):void 0!==i&&(s[o]=i));return s},n.queue=function(e,i,o){if(e){i=(i||"fx")+"queue";var r=n.data(e,i);return o?(!r||n.isArray(o)?r=n.data(e,i,function(e,n){var i=n||[];return null!=e&&(t(Object(e))?function(e,t){for(var n=+t.length,i=0,o=e.length;n>i;)e[o++]=t[i++];if(n!==n)for(;void 0!==t[i];)e[o++]=t[i++];e.length=o,e}(i,"string"==typeof e?[e]:e):[].push.call(i,e)),i}(o)):r.push(o),r):r||[]}},n.dequeue=function(e,t){n.each(e.nodeType?[e]:e,function(e,i){t=t||"fx";var o=n.queue(i,t),r=o.shift();"inprogress"===r&&(r=o.shift()),r&&("fx"===t&&o.unshift("inprogress"),r.call(i,function(){n.dequeue(i,t)}))})},n.fn=n.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),i=this.offset(),o=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:n(e).offset();return i.top-=parseFloat(t.style.marginTop)||0,i.left-=parseFloat(t.style.marginLeft)||0,e.style&&(o.top+=parseFloat(e.style.borderTopWidth)||0,o.left+=parseFloat(e.style.borderLeftWidth)||0),{top:i.top-o.top,left:i.left-o.left}}};var i={};n.expando="velocity"+(new Date).getTime(),n.uuid=0;for(var o={},r=o.hasOwnProperty,a=o.toString,s="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<s.length;l++)o["[object "+s[l]+"]"]=s[l].toLowerCase();n.fn.init.prototype=n.fn,e.Velocity={Utilities:n}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,n,i){function o(e){for(var t=-1,n=e?e.length:0,i=[];++t<n;){var o=e[t];o&&i.push(o)}return i}function r(e){return m.isWrapped(e)?e=[].slice.call(e):m.isNode(e)&&(e=[e]),e}function a(e){var t=p.data(e,"velocity");return null===t?i:t}function s(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,n,i,o){function r(e,t){return 1-3*t+3*e}function a(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,n){return((r(t,n)*e+a(t,n))*e+s(t))*e}function u(e,t,n){return 3*r(t,n)*e*e+2*a(t,n)*e+s(t)}function c(t,n){for(var o=0;m>o;++o){var r=u(n,e,i);if(0===r)return n;n-=(l(n,e,i)-t)/r}return n}function d(){for(var t=0;b>t;++t)T[t]=l(t*w,e,i)}function p(t,n,o){var r,a,s=0;do{a=n+(o-n)/2,r=l(a,e,i)-t,r>0?o=a:n=a}while(Math.abs(r)>g&&++s<y);return a}function f(t){for(var n=0,o=1,r=b-1;o!=r&&T[o]<=t;++o)n+=w;--o;var a=(t-T[o])/(T[o+1]-T[o]),s=n+a*w,l=u(s,e,i);return l>=v?c(t,s):0==l?s:p(t,n,n+w)}function h(){S=!0,(e!=n||i!=o)&&d()}var m=4,v=.001,g=1e-7,y=10,b=11,w=1/(b-1),x="Float32Array"in t;if(4!==arguments.length)return!1;for(var C=0;4>C;++C)if("number"!=typeof arguments[C]||isNaN(arguments[C])||!isFinite(arguments[C]))return!1;e=Math.min(e,1),i=Math.min(i,1),e=Math.max(e,0),i=Math.max(i,0);var T=x?new Float32Array(b):new Array(b),S=!1,E=function(t){return S||h(),e===n&&i===o?t:0===t?0:1===t?1:l(f(t),n,o)};E.getControlPoints=function(){return[{x:e,y:n},{x:i,y:o}]};var I="generateBezier("+[e,n,i,o]+")";return E.toString=function(){return I},E}function u(e,t){var n=e;return m.isString(e)?b.Easings[e]||(n=!1):n=m.isArray(e)&&1===e.length?s.apply(null,e):m.isArray(e)&&2===e.length?w.apply(null,e.concat([t])):!(!m.isArray(e)||4!==e.length)&&l.apply(null,e),n===!1&&(n=b.Easings[b.defaults.easing]?b.defaults.easing:y),n}function c(e){if(e){var t=(new Date).getTime(),n=b.State.calls.length;n>1e4&&(b.State.calls=o(b.State.calls));for(var r=0;n>r;r++)if(b.State.calls[r]){var s=b.State.calls[r],l=s[0],u=s[2],f=s[3],h=!!f,v=null;f||(f=b.State.calls[r][3]=t-16);for(var g=Math.min((t-f)/u.duration,1),y=0,w=l.length;w>y;y++){var C=l[y],S=C.element;if(a(S)){var E=!1;if(u.display!==i&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var I=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];p.each(I,function(e,t){x.setPropertyValue(S,"display",t)})}x.setPropertyValue(S,"display",u.display)}u.visibility!==i&&"hidden"!==u.visibility&&x.setPropertyValue(S,"visibility",u.visibility);for(var P in C)if("element"!==P){var k,A=C[P],O=m.isString(A.easing)?b.Easings[A.easing]:A.easing;if(1===g)k=A.endValue;else{var M=A.endValue-A.startValue;if(k=A.startValue+M*O(g,u,M),!h&&k===A.currentValue)continue}if(A.currentValue=k,"tween"===P)v=k;else{if(x.Hooks.registered[P]){var D=x.Hooks.getRoot(P),F=a(S).rootPropertyValueCache[D];F&&(A.rootPropertyValue=F)}var L=x.setPropertyValue(S,P,A.currentValue+(0===parseFloat(k)?"":A.unitType),A.rootPropertyValue,A.scrollData);x.Hooks.registered[P]&&(a(S).rootPropertyValueCache[D]=x.Normalizations.registered[D]?x.Normalizations.registered[D]("extract",null,L[1]):L[1]),"transform"===L[0]&&(E=!0)}}u.mobileHA&&a(S).transformCache.translate3d===i&&(a(S).transformCache.translate3d="(0px, 0px, 0px)",E=!0),E&&x.flushTransformCache(S)}}u.display!==i&&"none"!==u.display&&(b.State.calls[r][2].display=!1),u.visibility!==i&&"hidden"!==u.visibility&&(b.State.calls[r][2].visibility=!1),u.progress&&u.progress.call(s[1],s[1],g,Math.max(0,f+u.duration-t),f,v),1===g&&d(r)}}b.State.isTicking&&T(c)}function d(e,t){if(!b.State.calls[e])return!1;for(var n=b.State.calls[e][0],o=b.State.calls[e][1],r=b.State.calls[e][2],s=b.State.calls[e][4],l=!1,u=0,c=n.length;c>u;u++){var d=n[u].element;if(t||r.loop||("none"===r.display&&x.setPropertyValue(d,"display",r.display),"hidden"===r.visibility&&x.setPropertyValue(d,"visibility",r.visibility)),r.loop!==!0&&(p.queue(d)[1]===i||!/\.velocityQueueEntryFlag/i.test(p.queue(d)[1]))&&a(d)){a(d).isAnimating=!1,a(d).rootPropertyValueCache={};var f=!1;p.each(x.Lists.transforms3D,function(e,t){var n=/^scale/.test(t)?1:0,o=a(d).transformCache[t];a(d).transformCache[t]!==i&&new RegExp("^\\("+n+"[^.]").test(o)&&(f=!0,delete a(d).transformCache[t])}),r.mobileHA&&(f=!0,delete a(d).transformCache.translate3d),f&&x.flushTransformCache(d),x.Values.removeClass(d,"velocity-animating")}if(!t&&r.complete&&!r.loop&&u===c-1)try{r.complete.call(o,o)}catch(e){setTimeout(function(){throw e},1)}s&&r.loop!==!0&&s(o),a(d)&&r.loop===!0&&!t&&(p.each(a(d).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),b(d,"reverse",{loop:!0,delay:r.delay})),r.queue!==!1&&p.dequeue(d,r.queue)}b.State.calls[e]=!1;for(var h=0,m=b.State.calls.length;m>h;h++)if(b.State.calls[h]!==!1){l=!0;break}l===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var p,f=function(){if(n.documentMode)return n.documentMode;for(var e=7;e>4;e--){var t=n.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return i}(),h=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var n,i=(new Date).getTime();return n=Math.max(0,16-(i-e)),e=i+n,setTimeout(function(){t(i+n)},n)}}(),m={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==i&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},v=!1;if(e.fn&&e.fn.jquery?(p=e,v=!0):p=t.Velocity.Utilities,8>=f&&!v)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=f)return void(jQuery.fn.velocity=jQuery.fn.animate);var g=400,y="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:n.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:p,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:g,easing:y,begin:i,complete:i,progress:i,display:i,visibility:i,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){p.data(e,"velocity",{isSVG:m.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==i?(b.State.scrollAnchor=t,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=n.documentElement||n.body.parentNode||n.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop");var w=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,n,i){var o={x:t.x+i.dx*n,v:t.v+i.dv*n,tension:t.tension,friction:t.friction};return{dx:o.v,dv:e(o)}}function n(n,i){var o={dx:n.v,dv:e(n)},r=t(n,.5*i,o),a=t(n,.5*i,r),s=t(n,i,a),l=1/6*(o.dx+2*(r.dx+a.dx)+s.dx),u=1/6*(o.dv+2*(r.dv+a.dv)+s.dv);return n.x=n.x+l*i,n.v=n.v+u*i,n}return function e(t,i,o){var r,a,s,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0;for(t=parseFloat(t)||500,i=parseFloat(i)||20,o=o||null,l.tension=t,l.friction=i,r=null!==o,r?(c=e(t,i),a=c/o*.016):a=.016;s=n(s||l,a),u.push(1+s.x),c+=16,Math.abs(s.x)>1e-4&&Math.abs(s.v)>1e-4;);return r?function(e){return u[e*(u.length-1)|0]}:c}}();b.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},p.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){b.Easings[t[0]]=l.apply(null,t[1])});var x=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<x.Lists.colors.length;e++){var t="color"===x.Lists.colors[e]?"0 0 0 1":"255 255 255 1";x.Hooks.templates[x.Lists.colors[e]]=["Red Green Blue Alpha",t]}var n,i,o;if(f)for(n in x.Hooks.templates){i=x.Hooks.templates[n],o=i[0].split(" ");var r=i[1].match(x.RegEx.valueSplit);"Color"===o[0]&&(o.push(o.shift()),r.push(r.shift()),x.Hooks.templates[n]=[o.join(" "),r.join(" ")])}for(n in x.Hooks.templates){i=x.Hooks.templates[n],o=i[0].split(" ");for(var e in o){var a=n+o[e],s=e;x.Hooks.registered[a]=[n,s]}}},getRoot:function(e){var t=x.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return x.RegEx.valueUnwrap.test(t)&&(t=t.match(x.RegEx.valueUnwrap)[1]),x.Values.isCSSNullValue(t)&&(t=x.Hooks.templates[e][1]),t},extractValue:function(e,t){var n=x.Hooks.registered[e];if(n){var i=n[0],o=n[1];return t=x.Hooks.cleanRootPropertyValue(i,t),t.toString().match(x.RegEx.valueSplit)[o]}return t},injectValue:function(e,t,n){var i=x.Hooks.registered[e];if(i){var o,r=i[0],a=i[1];return n=x.Hooks.cleanRootPropertyValue(r,n),o=n.toString().match(x.RegEx.valueSplit),o[a]=t,o.join(" ")}return n}},Normalizations:{registered:{clip:function(e,t,n){switch(e){case"name":return"clip";case"extract":var i;return x.RegEx.wrappedValueAlreadyExtracted.test(n)?i=n:(i=n.toString().match(x.RegEx.valueUnwrap),i=i?i[1].replace(/,(\s+)?/g," "):n),i;case"inject":return"rect("+n+")"}},blur:function(e,t,n){switch(e){case"name":return b.State.isFirefox?"filter":"-webkit-filter";case"extract":var i=parseFloat(n);if(!i&&0!==i){var o=n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);i=o?o[1]:0}return i;case"inject":return parseFloat(n)?"blur("+n+")":"none"}},opacity:function(e,t,n){if(8>=f)switch(e){case"name":return"filter";case"extract":var i=n.toString().match(/alpha\(opacity=(.*)\)/i);return n=i?i[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(n)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(n),10)+")"}else switch(e){case"name":return"opacity";case"extract":return n;case"inject":return n}}},register:function(){9>=f||b.State.isGingerbread||(x.Lists.transformsBase=x.Lists.transformsBase.concat(x.Lists.transforms3D));for(var e=0;e<x.Lists.transformsBase.length;e++)!function(){var t=x.Lists.transformsBase[e];x.Normalizations.registered[t]=function(e,n,o){switch(e){case"name":return"transform";case"extract":return a(n)===i||a(n).transformCache[t]===i?/^scale/i.test(t)?1:0:a(n).transformCache[t].replace(/[()]/g,"");case"inject":var r=!1;switch(t.substr(0,t.length-1)){case"translate":r=!/(%|px|em|rem|vw|vh|\d)$/i.test(o);break;case"scal":case"scale":b.State.isAndroid&&a(n).transformCache[t]===i&&1>o&&(o=1),r=!/(\d)$/i.test(o);break;case"skew":r=!/(deg|\d)$/i.test(o);break;case"rotate":r=!/(deg|\d)$/i.test(o)}return r||(a(n).transformCache[t]="("+o+")"),a(n).transformCache[t]}}}();for(var e=0;e<x.Lists.colors.length;e++)!function(){var t=x.Lists.colors[e];x.Normalizations.registered[t]=function(e,n,o){switch(e){case"name":return t;case"extract":var r;if(x.RegEx.wrappedValueAlreadyExtracted.test(o))r=o;else{var a,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(o)?a=s[o]!==i?s[o]:s.black:x.RegEx.isHex.test(o)?a="rgb("+x.Values.hexToRgb(o).join(" ")+")":/^rgba?\(/i.test(o)||(a=s.black),r=(a||o).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=f||3!==r.split(" ").length||(r+=" 1"),r;case"inject":return 8>=f?4===o.split(" ").length&&(o=o.split(/\s+/).slice(0,3).join(" ")):3===o.split(" ").length&&(o+=" 1"),(8>=f?"rgb":"rgba")+"("+o.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(f||b.State.isAndroid&&!b.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(b.State.prefixMatches[e])return[b.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],n=0,i=t.length;i>n;n++){var o;if(o=0===n?e:t[n]+e.replace(/^\w/,function(e){return e.toUpperCase()}),m.isString(b.State.prefixElement.style[o]))return b.State.prefixMatches[e]=o,[o,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,t,n,i){return t+t+n+n+i+i}),t=n.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,n,o,r){function s(e,n){function o(){u&&x.setPropertyValue(e,"display","none")}var l=0;if(8>=f)l=p.css(e,n);else{var u=!1;if(/^(width|height)$/.test(n)&&0===x.getPropertyValue(e,"display")&&(u=!0,x.setPropertyValue(e,"display",x.Values.getDisplayType(e))),!r){if("height"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(x.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(x.getPropertyValue(e,"paddingBottom"))||0);return o(),c}if("width"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var d=e.offsetWidth-(parseFloat(x.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(x.getPropertyValue(e,"paddingRight"))||0);return o(),d}}var h;h=a(e)===i?t.getComputedStyle(e,null):a(e).computedStyle?a(e).computedStyle:a(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===n&&(n="borderTopColor"),l=9===f&&"filter"===n?h.getPropertyValue(n):h[n],(""===l||null===l)&&(l=e.style[n]),o()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(n)){var m=s(e,"position");("fixed"===m||"absolute"===m&&/top|left/i.test(n))&&(l=p(e).position()[n]+"px")}return l}var l;if(x.Hooks.registered[n]){var u=n,c=x.Hooks.getRoot(u);o===i&&(o=x.getPropertyValue(e,x.Names.prefixCheck(c)[0])),x.Normalizations.registered[c]&&(o=x.Normalizations.registered[c]("extract",e,o)),l=x.Hooks.extractValue(u,o)}else if(x.Normalizations.registered[n]){var d,h;d=x.Normalizations.registered[n]("name",e),"transform"!==d&&(h=s(e,x.Names.prefixCheck(d)[0]),x.Values.isCSSNullValue(h)&&x.Hooks.templates[n]&&(h=x.Hooks.templates[n][1])),l=x.Normalizations.registered[n]("extract",e,h)}if(!/^[\d-]/.test(l))if(a(e)&&a(e).isSVG&&x.Names.SVGAttribute(n))if(/^(height|width)$/i.test(n))try{l=e.getBBox()[n]}catch(e){l=0}else l=e.getAttribute(n);else l=s(e,x.Names.prefixCheck(n)[0]);return x.Values.isCSSNullValue(l)&&(l=0),b.debug>=2&&console.log("Get "+n+": "+l),l},setPropertyValue:function(e,n,i,o,r){var s=n;if("scroll"===n)r.container?r.container["scroll"+r.direction]=i:"Left"===r.direction?t.scrollTo(i,r.alternateValue):t.scrollTo(r.alternateValue,i);else if(x.Normalizations.registered[n]&&"transform"===x.Normalizations.registered[n]("name",e))x.Normalizations.registered[n]("inject",e,i),s="transform",i=a(e).transformCache[n];else{if(x.Hooks.registered[n]){var l=n,u=x.Hooks.getRoot(n);o=o||x.getPropertyValue(e,u),i=x.Hooks.injectValue(l,i,o),n=u}if(x.Normalizations.registered[n]&&(i=x.Normalizations.registered[n]("inject",e,i),n=x.Normalizations.registered[n]("name",e)),s=x.Names.prefixCheck(n)[0],8>=f)try{e.style[s]=i}catch(e){b.debug&&console.log("Browser does not support ["+i+"] for ["+s+"]")}else a(e)&&a(e).isSVG&&x.Names.SVGAttribute(n)?e.setAttribute(n,i):e.style[s]=i;b.debug>=2&&console.log("Set "+n+" ("+s+"): "+i)}return[s,i]},flushTransformCache:function(e){function t(t){return parseFloat(x.getPropertyValue(e,t))}var n="";if((f||b.State.isAndroid&&!b.State.isChrome)&&a(e).isSVG){var i={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};p.each(a(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),i[e]&&(n+=e+"("+i[e].join(" ")+") ",delete i[e])})}else{var o,r;p.each(a(e).transformCache,function(t){return o=a(e).transformCache[t],"transformPerspective"===t?(r=o,!0):(9===f&&"rotateZ"===t&&(t="rotate"),void(n+=t+o+" "))}),r&&(n="perspective"+r+" "+n)}x.setPropertyValue(e,"transform",n)}};x.Hooks.register(),x.Normalizations.register(),b.hook=function(e,t,n){var o=i;return e=r(e),p.each(e,function(e,r){if(a(r)===i&&b.init(r),n===i)o===i&&(o=b.CSS.getPropertyValue(r,t));else{var s=b.CSS.setPropertyValue(r,t,n);"transform"===s[0]&&b.CSS.flushTransformCache(r),o=s}}),o};var C=function(){function e(){return s?P.promise||null:l}function o(){function e(e){function d(e,t){var n=i,o=i,a=i;return m.isArray(e)?(n=e[0],!m.isArray(e[1])&&/^[\d-]/.test(e[1])||m.isFunction(e[1])||x.RegEx.isHex.test(e[1])?a=e[1]:(m.isString(e[1])&&!x.RegEx.isHex.test(e[1])||m.isArray(e[1]))&&(o=t?e[1]:u(e[1],s.duration),e[2]!==i&&(a=e[2]))):n=e,t||(o=o||s.easing),m.isFunction(n)&&(n=n.call(r,S,T)),m.isFunction(a)&&(a=a.call(r,S,T)),[n||0,o,a]}function f(e,t){var n,i;return i=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return n=e,""}),n||(n=x.Values.getUnitType(e)),[i,n]}if(s.begin&&0===S)try{s.begin.call(h,h)}catch(e){setTimeout(function(){throw e},1)}if("scroll"===k){var g,w,C,E=/^x$/i.test(s.axis)?"Left":"Top",I=parseFloat(s.offset)||0;s.container?m.isWrapped(s.container)||m.isNode(s.container)?(s.container=s.container[0]||s.container,g=s.container["scroll"+E],C=g+p(r).position()[E.toLowerCase()]+I):s.container=null:(g=b.State.scrollAnchor[b.State["scrollProperty"+E]],w=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===E?"Top":"Left")]],C=p(r).offset()[E.toLowerCase()]+I),l={scroll:{rootPropertyValue:!1,startValue:g,currentValue:g,endValue:C,unitType:"",easing:s.easing,scrollData:{container:s.container,direction:E,alternateValue:w}},element:r},b.debug&&console.log("tweensContainer (scroll): ",l.scroll,r)}else if("reverse"===k){if(!a(r).tweensContainer)return void p.dequeue(r,s.queue);"none"===a(r).opts.display&&(a(r).opts.display="auto"),"hidden"===a(r).opts.visibility&&(a(r).opts.visibility="visible"),a(r).opts.loop=!1,a(r).opts.begin=null,a(r).opts.complete=null,y.easing||delete s.easing,y.duration||delete s.duration,s=p.extend({},a(r).opts,s);var A=p.extend(!0,{},a(r).tweensContainer);for(var O in A)if("element"!==O){var M=A[O].startValue;A[O].startValue=A[O].currentValue=A[O].endValue,A[O].endValue=M,m.isEmptyObject(y)||(A[O].easing=s.easing),b.debug&&console.log("reverse tweensContainer ("+O+"): "+JSON.stringify(A[O]),r)}l=A}else if("start"===k){var A;a(r).tweensContainer&&a(r).isAnimating===!0&&(A=a(r).tweensContainer),p.each(v,function(e,t){if(RegExp("^"+x.Lists.colors.join("$|^")+"$").test(e)){var n=d(t,!0),o=n[0],r=n[1],a=n[2];if(x.RegEx.isHex.test(o)){for(var s=["Red","Green","Blue"],l=x.Values.hexToRgb(o),u=a?x.Values.hexToRgb(a):i,c=0;c<s.length;c++){var p=[l[c]];r&&p.push(r),u!==i&&p.push(u[c]),v[e+s[c]]=p}delete v[e]}}});for(var D in v){var F=d(v[D]),N=F[0],R=F[1],_=F[2];D=x.Names.camelCase(D);var z=x.Hooks.getRoot(D),H=!1;if(a(r).isSVG||"tween"===z||x.Names.prefixCheck(z)[1]!==!1||x.Normalizations.registered[z]!==i){(s.display!==i&&null!==s.display&&"none"!==s.display||s.visibility!==i&&"hidden"!==s.visibility)&&/opacity|filter/.test(D)&&!_&&0!==N&&(_=0),s._cacheValues&&A&&A[D]?(_===i&&(_=A[D].endValue+A[D].unitType),H=a(r).rootPropertyValueCache[z]):x.Hooks.registered[D]?_===i?(H=x.getPropertyValue(r,z),_=x.getPropertyValue(r,D,H)):H=x.Hooks.templates[z][1]:_===i&&(_=x.getPropertyValue(r,D));var j,$,W,q=!1;if(j=f(D,_),_=j[0],W=j[1],j=f(D,N),N=j[0].replace(/^([+-\/*])=/,function(e,t){return q=t,""}),$=j[1],_=parseFloat(_)||0,N=parseFloat(N)||0,"%"===$&&(/^(fontSize|lineHeight)$/.test(D)?(N/=100,$="em"):/^scale/.test(D)?(N/=100,$=""):/(Red|Green|Blue)$/i.test(D)&&(N=N/100*255,$="")),/[\/*]/.test(q))$=W;else if(W!==$&&0!==_)if(0===N)$=W;else{o=o||function(){var e={myParent:r.parentNode||n.body,position:x.getPropertyValue(r,"position"),fontSize:x.getPropertyValue(r,"fontSize")},i=e.position===L.lastPosition&&e.myParent===L.lastParent,o=e.fontSize===L.lastFontSize;L.lastParent=e.myParent,L.lastPosition=e.position,L.lastFontSize=e.fontSize;var s=100,l={};if(o&&i)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var u=a(r).isSVG?n.createElementNS("http://www.w3.org/2000/svg","rect"):n.createElement("div");b.init(u),e.myParent.appendChild(u),p.each(["overflow","overflowX","overflowY"],function(e,t){
b.CSS.setPropertyValue(u,t,"hidden")}),b.CSS.setPropertyValue(u,"position",e.position),b.CSS.setPropertyValue(u,"fontSize",e.fontSize),b.CSS.setPropertyValue(u,"boxSizing","content-box"),p.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){b.CSS.setPropertyValue(u,t,s+"%")}),b.CSS.setPropertyValue(u,"paddingLeft",s+"em"),l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(x.getPropertyValue(u,"width",null,!0))||1)/s,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(x.getPropertyValue(u,"height",null,!0))||1)/s,l.emToPx=L.lastEmToPx=(parseFloat(x.getPropertyValue(u,"paddingLeft"))||1)/s,e.myParent.removeChild(u)}return null===L.remToPx&&(L.remToPx=parseFloat(x.getPropertyValue(n.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(t.innerWidth)/100,L.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),r),l}();var Y=/margin|padding|left|right|width|text|word|letter/i.test(D)||/X$/.test(D)||"x"===D?"x":"y";switch(W){case"%":_*="x"===Y?o.percentToPxWidth:o.percentToPxHeight;break;case"px":break;default:_*=o[W+"ToPx"]}switch($){case"%":_*=1/("x"===Y?o.percentToPxWidth:o.percentToPxHeight);break;case"px":break;default:_*=1/o[$+"ToPx"]}}switch(q){case"+":N=_+N;break;case"-":N=_-N;break;case"*":N*=_;break;case"/":N=_/N}l[D]={rootPropertyValue:H,startValue:_,currentValue:_,endValue:N,unitType:$,easing:R},b.debug&&console.log("tweensContainer ("+D+"): "+JSON.stringify(l[D]),r)}else b.debug&&console.log("Skipping ["+z+"] due to a lack of browser support.")}l.element=r}l.element&&(x.Values.addClass(r,"velocity-animating"),V.push(l),""===s.queue&&(a(r).tweensContainer=l,a(r).opts=s),a(r).isAnimating=!0,S===T-1?(b.State.calls.push([V,h,s,null,P.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,c())):S++)}var o,r=this,s=p.extend({},b.defaults,y),l={};switch(a(r)===i&&b.init(r),parseFloat(s.delay)&&s.queue!==!1&&p.queue(r,s.queue,function(e){b.velocityQueueEntryFlag=!0,a(r).delayTimer={setTimeout:setTimeout(e,parseFloat(s.delay)),next:e}}),s.duration.toString().toLowerCase()){case"fast":s.duration=200;break;case"normal":s.duration=g;break;case"slow":s.duration=600;break;default:s.duration=parseFloat(s.duration)||1}b.mock!==!1&&(b.mock===!0?s.duration=s.delay=1:(s.duration*=parseFloat(b.mock)||1,s.delay*=parseFloat(b.mock)||1)),s.easing=u(s.easing,s.duration),s.begin&&!m.isFunction(s.begin)&&(s.begin=null),s.progress&&!m.isFunction(s.progress)&&(s.progress=null),s.complete&&!m.isFunction(s.complete)&&(s.complete=null),s.display!==i&&null!==s.display&&(s.display=s.display.toString().toLowerCase(),"auto"===s.display&&(s.display=b.CSS.Values.getDisplayType(r))),s.visibility!==i&&null!==s.visibility&&(s.visibility=s.visibility.toString().toLowerCase()),s.mobileHA=s.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,s.queue===!1?s.delay?setTimeout(e,s.delay):e():p.queue(r,s.queue,function(t,n){return n===!0?(P.promise&&P.resolver(h),!0):(b.velocityQueueEntryFlag=!0,void e(t))}),""!==s.queue&&"fx"!==s.queue||"inprogress"===p.queue(r)[0]||p.dequeue(r)}var s,l,f,h,v,y,w=arguments[0]&&(arguments[0].p||p.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||m.isString(arguments[0].properties));if(m.isWrapped(this)?(s=!1,f=0,h=this,l=this):(s=!0,f=1,h=w?arguments[0].elements||arguments[0].e:arguments[0]),h=r(h)){w?(v=arguments[0].properties||arguments[0].p,y=arguments[0].options||arguments[0].o):(v=arguments[f],y=arguments[f+1]);var T=h.length,S=0;if(!/^(stop|finish)$/i.test(v)&&!p.isPlainObject(y)){var E=f+1;y={};for(var I=E;I<arguments.length;I++)m.isArray(arguments[I])||!/^(fast|normal|slow)$/i.test(arguments[I])&&!/^\d/.test(arguments[I])?m.isString(arguments[I])||m.isArray(arguments[I])?y.easing=arguments[I]:m.isFunction(arguments[I])&&(y.complete=arguments[I]):y.duration=arguments[I]}var P={promise:null,resolver:null,rejecter:null};s&&b.Promise&&(P.promise=new b.Promise(function(e,t){P.resolver=e,P.rejecter=t}));var k;switch(v){case"scroll":k="scroll";break;case"reverse":k="reverse";break;case"finish":case"stop":p.each(h,function(e,t){a(t)&&a(t).delayTimer&&(clearTimeout(a(t).delayTimer.setTimeout),a(t).delayTimer.next&&a(t).delayTimer.next(),delete a(t).delayTimer)});var A=[];return p.each(b.State.calls,function(e,t){t&&p.each(t[1],function(n,o){var r=y===i?"":y;return r!==!0&&t[2].queue!==r&&(y!==i||t[2].queue!==!1)||void p.each(h,function(n,i){i===o&&((y===!0||m.isString(y))&&(p.each(p.queue(i,m.isString(y)?y:""),function(e,t){m.isFunction(t)&&t(null,!0)}),p.queue(i,m.isString(y)?y:"",[])),"stop"===v?(a(i)&&a(i).tweensContainer&&r!==!1&&p.each(a(i).tweensContainer,function(e,t){t.endValue=t.currentValue}),A.push(e)):"finish"===v&&(t[2].duration=1))})})}),"stop"===v&&(p.each(A,function(e,t){d(t,!0)}),P.promise&&P.resolver(h)),e();default:if(!p.isPlainObject(v)||m.isEmptyObject(v)){if(m.isString(v)&&b.Redirects[v]){var O=p.extend({},y),M=O.duration,D=O.delay||0;return O.backwards===!0&&(h=p.extend(!0,[],h).reverse()),p.each(h,function(e,t){parseFloat(O.stagger)?O.delay=D+parseFloat(O.stagger)*e:m.isFunction(O.stagger)&&(O.delay=D+O.stagger.call(t,e,T)),O.drag&&(O.duration=parseFloat(M)||(/^(callout|transition)/.test(v)?1e3:g),O.duration=Math.max(O.duration*(O.backwards?1-e/T:(e+1)/T),.75*O.duration,200)),b.Redirects[v].call(t,t,O||{},e,T,h,P.promise?P:i)}),e()}var F="Velocity: First argument ("+v+") was not a property map, a known action, or a registered redirect. Aborting.";return P.promise?P.rejecter(new Error(F)):console.log(F),e()}k="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},V=[];p.each(h,function(e,t){m.isNode(t)&&o.call(t)});var N,O=p.extend({},b.defaults,y);if(O.loop=parseInt(O.loop),N=2*O.loop-1,O.loop)for(var R=0;N>R;R++){var _={delay:O.delay,progress:O.progress};R===N-1&&(_.display=O.display,_.visibility=O.visibility,_.complete=O.complete),C(h,"reverse",_)}return e()}};b=p.extend(C,b),b.animate=C;var T=t.requestAnimationFrame||h;return b.State.isMobile||n.hidden===i||n.addEventListener("visibilitychange",function(){n.hidden?(T=function(e){return setTimeout(function(){e(!0)},16)},c()):T=t.requestAnimationFrame||h}),e.Velocity=b,e!==t&&(e.fn.velocity=C,e.fn.velocity.defaults=b.defaults),p.each(["Down","Up"],function(e,t){b.Redirects["slide"+t]=function(e,n,o,r,a,s){var l=p.extend({},n),u=l.begin,c=l.complete,d={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},f={};l.display===i&&(l.display="Down"===t?"inline"===b.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(a,a);for(var n in d){f[n]=e.style[n];var i=b.CSS.getPropertyValue(e,n);d[n]="Down"===t?[i,0]:[0,i]}f.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in f)e.style[t]=f[t];c&&c.call(a,a),s&&s.resolver(a)},b(e,d,l)}}),p.each(["In","Out"],function(e,t){b.Redirects["fade"+t]=function(e,n,o,r,a,s){var l=p.extend({},n),u={opacity:"In"===t?1:0},c=l.complete;l.complete=o!==r-1?l.begin=null:function(){c&&c.call(a,a),s&&s.resolver(a)},l.display===i&&(l.display="In"===t?"auto":"none"),b(this,u,l)}}),b}(window.jQuery||window.Zepto||window,window,document)})),function(){var e,t,n,i,o,r=function(e,t){return function(){return e.apply(t,arguments)}},a=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};t=function(){function e(){}return e.prototype.extend=function(e,t){var n,i;for(n in t)i=t[n],null==e[n]&&(e[n]=i);return e},e.prototype.isMobile=function(e){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)},e.prototype.createEvent=function(e,t,n,i){var o;return null==t&&(t=!1),null==n&&(n=!1),null==i&&(i=null),null!=document.createEvent?(o=document.createEvent("CustomEvent"),o.initCustomEvent(e,t,n,i)):null!=document.createEventObject?(o=document.createEventObject(),o.eventType=e):o.eventName=e,o},e.prototype.emitEvent=function(e,t){return null!=e.dispatchEvent?e.dispatchEvent(t):t in(null!=e)?e[t]():"on"+t in(null!=e)?e["on"+t]():void 0},e.prototype.addEvent=function(e,t,n){return null!=e.addEventListener?e.addEventListener(t,n,!1):null!=e.attachEvent?e.attachEvent("on"+t,n):e[t]=n},e.prototype.removeEvent=function(e,t,n){return null!=e.removeEventListener?e.removeEventListener(t,n,!1):null!=e.detachEvent?e.detachEvent("on"+t,n):delete e[t]},e.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},e}(),n=this.WeakMap||this.MozWeakMap||(n=function(){function e(){this.keys=[],this.values=[]}return e.prototype.get=function(e){var t,n,i,o;for(o=this.keys,t=n=0,i=o.length;n<i;t=++n)if(o[t]===e)return this.values[t]},e.prototype.set=function(e,t){var n,i,o,r;for(r=this.keys,n=i=0,o=r.length;i<o;n=++i)if(r[n]===e)return void(this.values[n]=t);return this.keys.push(e),this.values.push(t)},e}()),e=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(e=function(){function e(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return e.notSupported=!0,e.prototype.observe=function(){},e}()),i=this.getComputedStyle||function(e,t){return this.getPropertyValue=function(t){var n;return"float"===t&&(t="styleFloat"),o.test(t)&&t.replace(o,function(e,t){return t.toUpperCase()}),(null!=(n=e.currentStyle)?n[t]:void 0)||null},this},o=/(\-([a-z]){1})/g,this.WOW=function(){function o(e){null==e&&(e={}),this.scrollCallback=r(this.scrollCallback,this),this.scrollHandler=r(this.scrollHandler,this),this.resetAnimation=r(this.resetAnimation,this),this.start=r(this.start,this),this.scrolled=!0,this.config=this.util().extend(e,this.defaults),null!=e.scrollContainer&&(this.config.scrollContainer=document.querySelector(e.scrollContainer)),this.animationNameCache=new n,this.wowEvent=this.util().createEvent(this.config.boxClass)}return o.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null},o.prototype.init=function(){var e;return this.element=window.document.documentElement,"interactive"===(e=document.readyState)||"complete"===e?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},o.prototype.start=function(){var t,n,i,o;if(this.stopped=!1,this.boxes=function(){var e,n,i,o;for(i=this.element.querySelectorAll("."+this.config.boxClass),o=[],e=0,n=i.length;e<n;e++)t=i[e],o.push(t);return o}.call(this),this.all=function(){var e,n,i,o;for(i=this.boxes,o=[],e=0,n=i.length;e<n;e++)t=i[e],o.push(t);return o}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(o=this.boxes,n=0,i=o.length;n<i;n++)t=o[n],this.applyStyle(t,!0);if(this.disabled()||(this.util().addEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live)return new e(function(e){return function(t){var n,i,o,r,a;for(a=[],n=0,i=t.length;n<i;n++)r=t[n],a.push(function(){var e,t,n,i;for(n=r.addedNodes||[],i=[],e=0,t=n.length;e<t;e++)o=n[e],i.push(this.doSync(o));return i}.call(e));return a}}(this)).observe(document.body,{childList:!0,subtree:!0})},o.prototype.stop=function(){if(this.stopped=!0,this.util().removeEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval)return clearInterval(this.interval)},o.prototype.sync=function(t){if(e.notSupported)return this.doSync(this.element)},o.prototype.doSync=function(e){var t,n,i,o,r;if(null==e&&(e=this.element),1===e.nodeType){for(e=e.parentNode||e,o=e.querySelectorAll("."+this.config.boxClass),r=[],n=0,i=o.length;n<i;n++)t=o[n],a.call(this.all,t)<0?(this.boxes.push(t),this.all.push(t),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(t,!0),r.push(this.scrolled=!0)):r.push(void 0);return r}},o.prototype.show=function(e){return this.applyStyle(e),e.className=e.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(e),this.util().emitEvent(e,this.wowEvent),this.util().addEvent(e,"animationend",this.resetAnimation),this.util().addEvent(e,"oanimationend",this.resetAnimation),this.util().addEvent(e,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(e,"MSAnimationEnd",this.resetAnimation),e},o.prototype.applyStyle=function(e,t){var n,i,o;return i=e.getAttribute("data-wow-duration"),n=e.getAttribute("data-wow-delay"),o=e.getAttribute("data-wow-iteration"),this.animate(function(r){return function(){return r.customStyle(e,t,i,n,o)}}(this))},o.prototype.animate=function(){return"requestAnimationFrame"in window?function(e){return window.requestAnimationFrame(e)}:function(e){return e()}}(),o.prototype.resetStyle=function(){var e,t,n,i,o;for(i=this.boxes,o=[],t=0,n=i.length;t<n;t++)e=i[t],o.push(e.style.visibility="visible");return o},o.prototype.resetAnimation=function(e){var t;if(e.type.toLowerCase().indexOf("animationend")>=0)return t=e.target||e.srcElement,t.className=t.className.replace(this.config.animateClass,"").trim()},o.prototype.customStyle=function(e,t,n,i,o){return t&&this.cacheAnimationName(e),e.style.visibility=t?"hidden":"visible",n&&this.vendorSet(e.style,{animationDuration:n}),i&&this.vendorSet(e.style,{animationDelay:i}),o&&this.vendorSet(e.style,{animationIterationCount:o}),this.vendorSet(e.style,{animationName:t?"none":this.cachedAnimationName(e)}),e},o.prototype.vendors=["moz","webkit"],o.prototype.vendorSet=function(e,t){var n,i,o,r;i=[];for(n in t)o=t[n],e[""+n]=o,i.push(function(){var t,i,a,s;for(a=this.vendors,s=[],t=0,i=a.length;t<i;t++)r=a[t],s.push(e[""+r+n.charAt(0).toUpperCase()+n.substr(1)]=o);return s}.call(this));return i},o.prototype.vendorCSS=function(e,t){var n,o,r,a,s,l;for(s=i(e),a=s.getPropertyCSSValue(t),r=this.vendors,n=0,o=r.length;n<o;n++)l=r[n],a=a||s.getPropertyCSSValue("-"+l+"-"+t);return a},o.prototype.animationName=function(e){var t;try{t=this.vendorCSS(e,"animation-name").cssText}catch(n){t=i(e).getPropertyValue("animation-name")}return"none"===t?"":t},o.prototype.cacheAnimationName=function(e){return this.animationNameCache.set(e,this.animationName(e))},o.prototype.cachedAnimationName=function(e){return this.animationNameCache.get(e)},o.prototype.scrollHandler=function(){return this.scrolled=!0},o.prototype.scrollCallback=function(){var e;if(this.scrolled&&(this.scrolled=!1,this.boxes=function(){var t,n,i,o;for(i=this.boxes,o=[],t=0,n=i.length;t<n;t++)(e=i[t])&&(this.isVisible(e)?this.show(e):o.push(e));return o}.call(this),!this.boxes.length&&!this.config.live))return this.stop()},o.prototype.offsetTop=function(e){for(var t;void 0===e.offsetTop;)e=e.parentNode;for(t=e.offsetTop;e=e.offsetParent;)t+=e.offsetTop;return t},o.prototype.isVisible=function(e){var t,n,i,o,r;return n=e.getAttribute("data-wow-offset")||this.config.offset,r=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,o=r+Math.min(this.element.clientHeight,this.util().innerHeight())-n,i=this.offsetTop(e),t=i+e.clientHeight,i<=o&&t>=r},o.prototype.util=function(){return null!=this._util?this._util:this._util=new t},o.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},o}()}.call(this),$(window).scroll(function(){$(".navbar").offset()&&($(".navbar").offset().top>50?$(".scrolling-navbar").addClass("top-nav-collapse"):$(".scrolling-navbar").removeClass("top-nav-collapse"))}),$(function(){$("a.page-scroll").bind("click",function(e){var t=$(this);$("html, body").stop().animate({scrollTop:$(t.attr("href")).offset().top},1500,"easeInOutExpo"),e.preventDefault()})}),function(e,t){"use strict";"function"==typeof define&&define.amd?define([],function(){return t.apply(e)}):"object"==typeof exports?module.exports=t.call(e):e.Waves=t.call(e)}("object"==typeof global?global:this,function(){"use strict";function e(e){return null!==e&&e===e.window}function t(t){return e(t)?t:9===t.nodeType&&t.defaultView}function n(e){var t=typeof e;return"function"===t||"object"===t&&!!e}function i(e){return n(e)&&e.nodeType>0}function o(e){var t=p.call(e);return"[object String]"===t?d(e):n(e)&&/^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(t)&&e.hasOwnProperty("length")?e:i(e)?[e]:[]}function r(e){var n,i,o={top:0,left:0},r=e&&e.ownerDocument;return n=r.documentElement,void 0!==e.getBoundingClientRect&&(o=e.getBoundingClientRect()),i=t(r),{top:o.top+i.pageYOffset-n.clientTop,left:o.left+i.pageXOffset-n.clientLeft}}function a(e){var t="";for(var n in e)e.hasOwnProperty(n)&&(t+=n+":"+e[n]+";");return t}function s(e,t,n){if(n){n.classList.remove("waves-rippling");var i=n.getAttribute("data-x"),o=n.getAttribute("data-y"),r=n.getAttribute("data-scale"),s=n.getAttribute("data-translate"),l=Date.now()-Number(n.getAttribute("data-hold")),u=350-l;u<0&&(u=0),"mousemove"===e.type&&(u=150);var c="mousemove"===e.type?2500:h.duration;setTimeout(function(){var e={top:o+"px",left:i+"px",opacity:"0","-webkit-transition-duration":c+"ms","-moz-transition-duration":c+"ms","-o-transition-duration":c+"ms","transition-duration":c+"ms","-webkit-transform":r+" "+s,"-moz-transform":r+" "+s,"-ms-transform":r+" "+s,"-o-transform":r+" "+s,transform:r+" "+s};n.setAttribute("style",a(e)),setTimeout(function(){try{t.removeChild(n)}catch(e){return!1}},c)},u)}}function l(e){if(v.allowEvent(e)===!1)return null;for(var t=null,n=e.target||e.srcElement;null!==n.parentElement;){if(n.classList.contains("waves-effect")&&!(n instanceof SVGElement)){t=n;break}n=n.parentElement}return t}function u(e){var t=l(e);if(null!==t){if(t.disabled||t.getAttribute("disabled")||t.classList.contains("disabled"))return;if(v.registerEvent(e),"touchstart"===e.type&&h.delay){var n=!1,i=setTimeout(function(){i=null,h.show(e,t)},h.delay),o=function(o){i&&(clearTimeout(i),i=null,h.show(e,t)),n||(n=!0,h.hide(o,t))},r=function(e){i&&(clearTimeout(i),i=null),o(e)};t.addEventListener("touchmove",r,!1),t.addEventListener("touchend",o,!1),t.addEventListener("touchcancel",o,!1)}else h.show(e,t),f&&(t.addEventListener("touchend",h.hide,!1),t.addEventListener("touchcancel",h.hide,!1)),t.addEventListener("mouseup",h.hide,!1),t.addEventListener("mouseleave",h.hide,!1)}}var c=c||{},d=document.querySelectorAll.bind(document),p=Object.prototype.toString,f="ontouchstart"in window,h={duration:750,delay:200,show:function(e,t,n){if(2===e.button)return!1;t=t||this;var i=document.createElement("div");i.className="waves-ripple waves-rippling",t.appendChild(i);var o=r(t),s=0,l=0;"touches"in e&&e.touches.length?(s=e.touches[0].pageY-o.top,l=e.touches[0].pageX-o.left):(s=e.pageY-o.top,l=e.pageX-o.left),l=l>=0?l:0,s=s>=0?s:0;var u="scale("+t.clientWidth/100*3+")",c="translate(0,0)";n&&(c="translate("+n.x+"px, "+n.y+"px)"),i.setAttribute("data-hold",Date.now()),i.setAttribute("data-x",l),i.setAttribute("data-y",s),i.setAttribute("data-scale",u),i.setAttribute("data-translate",c);var d={top:s+"px",left:l+"px"};i.classList.add("waves-notransition"),i.setAttribute("style",a(d)),i.classList.remove("waves-notransition"),d["-webkit-transform"]=u+" "+c,d["-moz-transform"]=u+" "+c,d["-ms-transform"]=u+" "+c,d["-o-transform"]=u+" "+c,d.transform=u+" "+c,d.opacity="1";var p="mousemove"===e.type?2500:h.duration;d["-webkit-transition-duration"]=p+"ms",d["-moz-transition-duration"]=p+"ms",d["-o-transition-duration"]=p+"ms",d["transition-duration"]=p+"ms",i.setAttribute("style",a(d))},hide:function(e,t){t=t||this;for(var n=t.getElementsByClassName("waves-rippling"),i=0,o=n.length;i<o;i++)s(e,t,n[i])}},m={input:function(e){var t=e.parentNode;if("i"!==t.tagName.toLowerCase()||!t.classList.contains("waves-effect")){var n=document.createElement("i");n.className=e.className+" waves-input-wrapper",e.className="waves-button-input",t.replaceChild(n,e),n.appendChild(e);var i=window.getComputedStyle(e,null),o=i.color,r=i.backgroundColor;n.setAttribute("style","color:"+o+";background:"+r),e.setAttribute("style","background-color:rgba(0,0,0,0);")}},img:function(e){var t=e.parentNode;if("i"!==t.tagName.toLowerCase()||!t.classList.contains("waves-effect")){var n=document.createElement("i");t.replaceChild(n,e),n.appendChild(e)}}},v={touches:0,allowEvent:function(e){var t=!0;return/^(mousedown|mousemove)$/.test(e.type)&&v.touches&&(t=!1),t},registerEvent:function(e){var t=e.type;"touchstart"===t?v.touches+=1:/^(touchend|touchcancel)$/.test(t)&&setTimeout(function(){v.touches&&(v.touches-=1)},500)}};return c.init=function(e){var t=document.body;e=e||{},"duration"in e&&(h.duration=e.duration),"delay"in e&&(h.delay=e.delay),f&&(t.addEventListener("touchstart",u,!1),t.addEventListener("touchcancel",v.registerEvent,!1),t.addEventListener("touchend",v.registerEvent,!1)),t.addEventListener("mousedown",u,!1)},c.attach=function(e,t){e=o(e),"[object Array]"===p.call(t)&&(t=t.join(" ")),t=t?" "+t:"";for(var n,i,r=0,a=e.length;r<a;r++)n=e[r],i=n.tagName.toLowerCase(),["input","img"].indexOf(i)!==-1&&(m[i](n),n=n.parentElement),n.className.indexOf("waves-effect")===-1&&(n.className+=" waves-effect"+t)},c.ripple=function(e,t){e=o(e);var n=e.length;if(t=t||{},t.wait=t.wait||0,t.position=t.position||null,n)for(var i,a,s,l={},u=0,c={type:"mousedown",button:1};u<n;u++)if(i=e[u],a=t.position||{x:i.clientWidth/2,y:i.clientHeight/2},s=r(i),l.x=s.left+a.x,l.y=s.top+a.y,c.pageX=l.x,c.pageY=l.y,h.show(c,i),t.wait>=0&&null!==t.wait){var d={type:"mouseup",button:1};setTimeout(function(e,t){return function(){h.hide(e,t)}}(d,i),t.wait)}},c.calm=function(e){e=o(e);for(var t={type:"mouseup",button:1},n=0,i=e.length;n<i;n++)h.hide(t,e[n])},c.displayEffect=function(e){console.error("Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"),c.init(e)},c}),Waves.attach(".btn, .btn-floating",["waves-light"]),Waves.attach(".waves-light",["waves-light"]),Waves.attach(".navbar-nav a:not(.navbar-brand), .nav-icons li a, .navbar form, .nav-tabs .nav-item",["waves-light"]),Waves.attach(".pager li a",["waves-light"]),Waves.attach(".pagination .page-item .page-link",["waves-effect"]),Waves.init(),$(document).ready(function(){$("#preloader-markup").load("mdb-addons/preloader.html",function(){$("#preloader-markup").fadeOut("slow")})}),$(".smooth-scroll").on("click","a",function(e){e.preventDefault();var t=$(this).attr("href"),n=$(this).attr("data-offset")?$(this).attr("data-offset"):0;$("body,html").animate({scrollTop:$(t).offset().top-n},700)}),function(e){e.fn.scrollTo=function(t){return e(this).scrollTop(e(this).scrollTop()-e(this).offset().top+e(t).offset().top),this},e.fn.dropdown=function(t){var n={inDuration:300,outDuration:225,constrain_width:!0,hover:!1,gutter:0,belowOrigin:!1,alignment:"left"};this.each(function(){function i(){void 0!==a.data("induration")&&(s.inDuration=a.data("inDuration")),void 0!==a.data("outduration")&&(s.outDuration=a.data("outDuration")),void 0!==a.data("constrainwidth")&&(s.constrain_width=a.data("constrainwidth")),void 0!==a.data("hover")&&(s.hover=a.data("hover")),void 0!==a.data("gutter")&&(s.gutter=a.data("gutter")),void 0!==a.data("beloworigin")&&(s.belowOrigin=a.data("beloworigin")),void 0!==a.data("alignment")&&(s.alignment=a.data("alignment"))}function o(t){"focus"===t&&(l=!0),i(),u.addClass("active"),a.addClass("active"),s.constrain_width===!0?u.css("width",a.outerWidth()):u.css("white-space","nowrap");var n=window.innerHeight,o=a.innerHeight(),r=a.offset().left,c=a.offset().top-e(window).scrollTop(),d=s.alignment,p=0,f=0,h=0;s.belowOrigin===!0&&(h=o);var m=0,v=a.parent();if(!v.is("body")&&v[0].scrollHeight>v[0].clientHeight&&(m=v[0].scrollTop),r+u.innerWidth()>e(window).width()?d="right":r-u.innerWidth()+a.innerWidth()<0&&(d="left"),c+u.innerHeight()>n)if(c+o-u.innerHeight()<0){var g=n-c-h;u.css("max-height",g)}else h||(h+=o),h-=u.innerHeight();if("left"===d)p=s.gutter,f=a.position().left+p;else if("right"===d){var y=a.position().left+a.outerWidth()-u.outerWidth();p=-s.gutter,f=y+p}u.css({position:"absolute",top:a.position().top+h+m,left:f}),u.stop(!0,!0).css("opacity",0).slideDown({queue:!1,duration:s.inDuration,easing:"easeOutCubic",complete:function(){e(this).css("height","")}}).animate({opacity:1},{queue:!1,duration:s.inDuration,easing:"easeOutSine"})}function r(){l=!1,u.fadeOut(s.outDuration),u.removeClass("active"),a.removeClass("active"),setTimeout(function(){u.css("max-height","")},s.outDuration)}var a=e(this),s=e.extend({},n,t),l=!1,u=e("#"+a.attr("data-activates"));if(i(),a.after(u),s.hover){var c=!1;a.unbind("click."+a.attr("id")),a.on("mouseenter",function(e){c===!1&&(o(),c=!0)}),a.on("mouseleave",function(t){e(t.toElement||t.relatedTarget).closest(".dropdown-content").is(u)||(u.stop(!0,!0),r(),c=!1)}),u.on("mouseleave",function(t){e(t.toElement||t.relatedTarget).closest(".dropdown-button").is(a)||(u.stop(!0,!0),r(),c=!1)})}else a.unbind("click."+a.attr("id")),a.bind("click."+a.attr("id"),function(t){l||(a[0]!=t.currentTarget||a.hasClass("active")||0!==e(t.target).closest(".dropdown-content").length?a.hasClass("active")&&(r(),e(document).unbind("click."+u.attr("id")+" touchstart."+u.attr("id"))):(t.preventDefault(),o("click")),u.hasClass("active")&&e(document).bind("click."+u.attr("id")+" touchstart."+u.attr("id"),function(t){u.is(t.target)||a.is(t.target)||a.find(t.target).length||(r(),e(document).unbind("click."+u.attr("id")+" touchstart."+u.attr("id")))}))});a.on("open",function(e,t){o(t)}),a.on("close",r)})},e(document).ready(function(){e(".dropdown-button").dropdown()})}(jQuery);var dropdownSelectors=$(".dropdown, .dropup");dropdownSelectors.on({"show.bs.dropdown":function(){var e=dropdownEffectData(this);dropdownEffectStart(e,e.effectIn)},"shown.bs.dropdown":function(){var e=dropdownEffectData(this);e.effectIn&&e.effectOut&&dropdownEffectEnd(e,function(){})},"hide.bs.dropdown":function(e){var t=dropdownEffectData(this);t.effectOut&&(e.preventDefault(),dropdownEffectStart(t,t.effectOut),dropdownEffectEnd(t,function(){t.dropdown.removeClass("open"),t.dropdown.removeClass("show")}))}}),function(e){function t(t){if($this=t,$this.hasClass("active")===!1){$this.addClass("active"),$this.find("ul .btn-floating").velocity({scaleY:".4",scaleX:".4",translateY:"40px"},{duration:0});var n=0;$this.find("ul .btn-floating").reverse().each(function(){e(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0"},{duration:80,delay:n}),n+=40})}else{$this.removeClass("active");var n=0;$this.find("ul .btn-floating").velocity("stop",!0),$this.find("ul .btn-floating").velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:"40px"},{duration:80})}}e(document).ready(function(){e.fn.reverse=[].reverse,e(document).on("mouseenter.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle)",function(t){n(e(this))}),e(document).on("mouseleave.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle)",function(t){i(e(this))}),e(document).on("click.fixedActionBtn",".fixed-action-btn.click-to-toggle > a",function(t){var o=e(this),r=o.parent();r.hasClass("active")?i(r):n(r)})}),e.fn.extend({openFAB:function(){n(e(this))},closeFAB:function(){i(e(this))}});var n=function(t){if($this=t,$this.hasClass("active")===!1){var n,i,o=$this.hasClass("horizontal");o===!0?i=40:n=40,$this.addClass("active"),$this.find("ul .btn-floating").velocity({scaleY:".4",scaleX:".4",translateY:n+"px",translateX:i+"px"},{duration:0});var r=0;$this.find("ul .btn-floating").reverse().each(function(){e(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0",translateX:"0"},{duration:80,delay:r}),r+=40})}},i=function(e){$this=e;var t,n,i=$this.hasClass("horizontal");i===!0?n=40:t=40,$this.removeClass("active");$this.find("ul .btn-floating").velocity("stop",!0),$this.find("ul .btn-floating").velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:t+"px",translateX:n+"px"},{duration:80})};e(".fixed-action-btn").on({click:function(n){return n.preventDefault(),t(e(".fixed-action-btn")),!1}})}(jQuery),function(e,t,n,i){"use strict";function o(e,t,n){return setTimeout(u(e,n),t)}function r(e,t,n){return!!Array.isArray(e)&&(a(e,n[t],n),!0)}function a(e,t,n){var o;if(e)if(e.forEach)e.forEach(t,n);else if(e.length!==i)for(o=0;o<e.length;)t.call(n,e[o],o,e),o++;else for(o in e)e.hasOwnProperty(o)&&t.call(n,e[o],o,e)}function s(t,n,i){var o="DEPRECATED METHOD: "+n+"\n"+i+" AT \n";return function(){var n=new Error("get-stack-trace"),i=n&&n.stack?n.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",r=e.console&&(e.console.warn||e.console.log);return r&&r.call(e.console,o,i),t.apply(this,arguments)}}function l(e,t,n){var i,o=t.prototype;i=e.prototype=Object.create(o),i.constructor=e,i._super=o,n&&ce(i,n)}function u(e,t){return function(){return e.apply(t,arguments)}}function c(e,t){return typeof e==fe?e.apply(t?t[0]||i:i,t):e}function d(e,t){return e===i?t:e}function p(e,t,n){a(v(t),function(t){e.addEventListener(t,n,!1)})}function f(e,t,n){a(v(t),function(t){e.removeEventListener(t,n,!1)})}function h(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1}function m(e,t){return e.indexOf(t)>-1}function v(e){return e.trim().split(/\s+/g)}function g(e,t,n){if(e.indexOf&&!n)return e.indexOf(t);for(var i=0;i<e.length;){if(n&&e[i][n]==t||!n&&e[i]===t)return i;i++}return-1}function y(e){return Array.prototype.slice.call(e,0)}function b(e,t,n){for(var i=[],o=[],r=0;r<e.length;){var a=t?e[r][t]:e[r];g(o,a)<0&&i.push(e[r]),o[r]=a,r++}return n&&(i=t?i.sort(function(e,n){return e[t]>n[t]}):i.sort()),i}function w(e,t){for(var n,o,r=t[0].toUpperCase()+t.slice(1),a=0;a<de.length;){if(n=de[a],(o=n?n+r:t)in e)return o;a++}return i}function x(){return be++}function C(t){var n=t.ownerDocument||t;return n.defaultView||n.parentWindow||e}function T(e,t){var n=this;this.manager=e,this.callback=t,this.element=e.element,this.target=e.options.inputTarget,this.domHandler=function(t){c(e.options.enable,[e])&&n.handler(t)},this.init()}function S(e){var t=e.options.inputClass;return new(t?t:Ce?_:Te?j:xe?W:R)(e,E)}function E(e,t,n){var i=n.pointers.length,o=n.changedPointers.length,r=t&Ee&&i-o==0,a=t&(Pe|ke)&&i-o==0;n.isFirst=!!r,n.isFinal=!!a,r&&(e.session={}),n.eventType=t,I(e,n),e.emit("hammer.input",n),e.recognize(n),e.session.prevInput=n}function I(e,t){var n=e.session,i=t.pointers,o=i.length;n.firstInput||(n.firstInput=A(t)),o>1&&!n.firstMultiple?n.firstMultiple=A(t):1===o&&(n.firstMultiple=!1);var r=n.firstInput,a=n.firstMultiple,s=a?a.center:r.center,l=t.center=O(i);t.timeStamp=ve(),t.deltaTime=t.timeStamp-r.timeStamp,t.angle=L(s,l),t.distance=F(s,l),P(n,t),t.offsetDirection=D(t.deltaX,t.deltaY);var u=M(t.deltaTime,t.deltaX,t.deltaY);t.overallVelocityX=u.x,t.overallVelocityY=u.y,t.overallVelocity=me(u.x)>me(u.y)?u.x:u.y,t.scale=a?N(a.pointers,i):1,t.rotation=a?V(a.pointers,i):0,t.maxPointers=n.prevInput?t.pointers.length>n.prevInput.maxPointers?t.pointers.length:n.prevInput.maxPointers:t.pointers.length,k(n,t);var c=e.element;h(t.srcEvent.target,c)&&(c=t.srcEvent.target),t.target=c}function P(e,t){var n=t.center,i=e.offsetDelta||{},o=e.prevDelta||{},r=e.prevInput||{};t.eventType!==Ee&&r.eventType!==Pe||(o=e.prevDelta={x:r.deltaX||0,y:r.deltaY||0},i=e.offsetDelta={x:n.x,y:n.y}),t.deltaX=o.x+(n.x-i.x),t.deltaY=o.y+(n.y-i.y)}function k(e,t){var n,o,r,a,s=e.lastInterval||t,l=t.timeStamp-s.timeStamp;if(t.eventType!=ke&&(l>Se||s.velocity===i)){var u=t.deltaX-s.deltaX,c=t.deltaY-s.deltaY,d=M(l,u,c);o=d.x,r=d.y,n=me(d.x)>me(d.y)?d.x:d.y,a=D(u,c),e.lastInterval=t}else n=s.velocity,o=s.velocityX,r=s.velocityY,a=s.direction;t.velocity=n,t.velocityX=o,t.velocityY=r,t.direction=a}
function A(e){for(var t=[],n=0;n<e.pointers.length;)t[n]={clientX:he(e.pointers[n].clientX),clientY:he(e.pointers[n].clientY)},n++;return{timeStamp:ve(),pointers:t,center:O(t),deltaX:e.deltaX,deltaY:e.deltaY}}function O(e){var t=e.length;if(1===t)return{x:he(e[0].clientX),y:he(e[0].clientY)};for(var n=0,i=0,o=0;o<t;)n+=e[o].clientX,i+=e[o].clientY,o++;return{x:he(n/t),y:he(i/t)}}function M(e,t,n){return{x:t/e||0,y:n/e||0}}function D(e,t){return e===t?Ae:me(e)>=me(t)?e<0?Oe:Me:t<0?De:Fe}function F(e,t,n){n||(n=Re);var i=t[n[0]]-e[n[0]],o=t[n[1]]-e[n[1]];return Math.sqrt(i*i+o*o)}function L(e,t,n){n||(n=Re);var i=t[n[0]]-e[n[0]],o=t[n[1]]-e[n[1]];return 180*Math.atan2(o,i)/Math.PI}function V(e,t){return L(t[1],t[0],_e)+L(e[1],e[0],_e)}function N(e,t){return F(t[0],t[1],_e)/F(e[0],e[1],_e)}function R(){this.evEl=He,this.evWin=je,this.pressed=!1,T.apply(this,arguments)}function _(){this.evEl=qe,this.evWin=Ye,T.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function z(){this.evTarget=Xe,this.evWin=Ze,this.started=!1,T.apply(this,arguments)}function H(e,t){var n=y(e.touches),i=y(e.changedTouches);return t&(Pe|ke)&&(n=b(n.concat(i),"identifier",!0)),[n,i]}function j(){this.evTarget=Ge,this.targetIds={},T.apply(this,arguments)}function $(e,t){var n=y(e.touches),i=this.targetIds;if(t&(Ee|Ie)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var o,r,a=y(e.changedTouches),s=[],l=this.target;if(r=n.filter(function(e){return h(e.target,l)}),t===Ee)for(o=0;o<r.length;)i[r[o].identifier]=!0,o++;for(o=0;o<a.length;)i[a[o].identifier]&&s.push(a[o]),t&(Pe|ke)&&delete i[a[o].identifier],o++;return s.length?[b(r.concat(s),"identifier",!0),s]:void 0}function W(){T.apply(this,arguments);var e=u(this.handler,this);this.touch=new j(this.manager,e),this.mouse=new R(this.manager,e),this.primaryTouch=null,this.lastTouches=[]}function q(e,t){e&Ee?(this.primaryTouch=t.changedPointers[0].identifier,Y.call(this,t)):e&(Pe|ke)&&Y.call(this,t)}function Y(e){var t=e.changedPointers[0];if(t.identifier===this.primaryTouch){var n={x:t.clientX,y:t.clientY};this.lastTouches.push(n);var i=this.lastTouches,o=function(){var e=i.indexOf(n);e>-1&&i.splice(e,1)};setTimeout(o,Qe)}}function B(e){for(var t=e.srcEvent.clientX,n=e.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var o=this.lastTouches[i],r=Math.abs(t-o.x),a=Math.abs(n-o.y);if(r<=Ke&&a<=Ke)return!0}return!1}function X(e,t){this.manager=e,this.set(t)}function Z(e){if(m(e,it))return it;var t=m(e,ot),n=m(e,rt);return t&&n?it:t||n?t?ot:rt:m(e,nt)?nt:tt}function U(e){this.options=ce({},this.defaults,e||{}),this.id=x(),this.manager=null,this.options.enable=d(this.options.enable,!0),this.state=st,this.simultaneous={},this.requireFail=[]}function G(e){return e&pt?"cancel":e&ct?"end":e&ut?"move":e&lt?"start":""}function Q(e){return e==Fe?"down":e==De?"up":e==Oe?"left":e==Me?"right":""}function K(e,t){var n=t.manager;return n?n.get(e):e}function J(){U.apply(this,arguments)}function ee(){J.apply(this,arguments),this.pX=null,this.pY=null}function te(){J.apply(this,arguments)}function ne(){U.apply(this,arguments),this._timer=null,this._input=null}function ie(){J.apply(this,arguments)}function oe(){J.apply(this,arguments)}function re(){U.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ae(e,t){return t=t||{},t.recognizers=d(t.recognizers,ae.defaults.preset),new se(e,t)}function se(e,t){this.options=ce({},ae.defaults,t||{}),this.options.inputTarget=this.options.inputTarget||e,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=e,this.input=S(this),this.touchAction=new X(this,this.options.touchAction),le(this,!0),a(this.options.recognizers,function(e){var t=this.add(new e[0](e[1]));e[2]&&t.recognizeWith(e[2]),e[3]&&t.requireFailure(e[3])},this)}function le(e,t){var n=e.element;if(n.style){var i;a(e.options.cssProps,function(o,r){i=w(n.style,r),t?(e.oldCssProps[i]=n.style[i],n.style[i]=o):n.style[i]=e.oldCssProps[i]||""}),t||(e.oldCssProps={})}}function ue(e,n){var i=t.createEvent("Event");i.initEvent(e,!0,!0),i.gesture=n,n.target.dispatchEvent(i)}var ce,de=["","webkit","Moz","MS","ms","o"],pe=t.createElement("div"),fe="function",he=Math.round,me=Math.abs,ve=Date.now;ce="function"!=typeof Object.assign?function(e){if(e===i||null===e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),n=1;n<arguments.length;n++){var o=arguments[n];if(o!==i&&null!==o)for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])}return t}:Object.assign;var ge=s(function(e,t,n){for(var o=Object.keys(t),r=0;r<o.length;)(!n||n&&e[o[r]]===i)&&(e[o[r]]=t[o[r]]),r++;return e},"extend","Use `assign`."),ye=s(function(e,t){return ge(e,t,!0)},"merge","Use `assign`."),be=1,we=/mobile|tablet|ip(ad|hone|od)|android/i,xe="ontouchstart"in e,Ce=w(e,"PointerEvent")!==i,Te=xe&&we.test(navigator.userAgent),Se=25,Ee=1,Ie=2,Pe=4,ke=8,Ae=1,Oe=2,Me=4,De=8,Fe=16,Le=Oe|Me,Ve=De|Fe,Ne=Le|Ve,Re=["x","y"],_e=["clientX","clientY"];T.prototype={handler:function(){},init:function(){this.evEl&&p(this.element,this.evEl,this.domHandler),this.evTarget&&p(this.target,this.evTarget,this.domHandler),this.evWin&&p(C(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(C(this.element),this.evWin,this.domHandler)}};var ze={mousedown:Ee,mousemove:Ie,mouseup:Pe},He="mousedown",je="mousemove mouseup";l(R,T,{handler:function(e){var t=ze[e.type];t&Ee&&0===e.button&&(this.pressed=!0),t&Ie&&1!==e.which&&(t=Pe),this.pressed&&(t&Pe&&(this.pressed=!1),this.callback(this.manager,t,{pointers:[e],changedPointers:[e],pointerType:"mouse",srcEvent:e}))}});var $e={pointerdown:Ee,pointermove:Ie,pointerup:Pe,pointercancel:ke,pointerout:ke},We={2:"touch",3:"pen",4:"mouse",5:"kinect"},qe="pointerdown",Ye="pointermove pointerup pointercancel";e.MSPointerEvent&&!e.PointerEvent&&(qe="MSPointerDown",Ye="MSPointerMove MSPointerUp MSPointerCancel"),l(_,T,{handler:function(e){var t=this.store,n=!1,i=e.type.toLowerCase().replace("ms",""),o=$e[i],r=We[e.pointerType]||e.pointerType,a="touch"==r,s=g(t,e.pointerId,"pointerId");o&Ee&&(0===e.button||a)?s<0&&(t.push(e),s=t.length-1):o&(Pe|ke)&&(n=!0),s<0||(t[s]=e,this.callback(this.manager,o,{pointers:t,changedPointers:[e],pointerType:r,srcEvent:e}),n&&t.splice(s,1))}});var Be={touchstart:Ee,touchmove:Ie,touchend:Pe,touchcancel:ke},Xe="touchstart",Ze="touchstart touchmove touchend touchcancel";l(z,T,{handler:function(e){var t=Be[e.type];if(t===Ee&&(this.started=!0),this.started){var n=H.call(this,e,t);t&(Pe|ke)&&n[0].length-n[1].length==0&&(this.started=!1),this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:e})}}});var Ue={touchstart:Ee,touchmove:Ie,touchend:Pe,touchcancel:ke},Ge="touchstart touchmove touchend touchcancel";l(j,T,{handler:function(e){var t=Ue[e.type],n=$.call(this,e,t);n&&this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:e})}});var Qe=2500,Ke=25;l(W,T,{handler:function(e,t,n){var i="touch"==n.pointerType,o="mouse"==n.pointerType;if(!(o&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)q.call(this,t,n);else if(o&&B.call(this,n))return;this.callback(e,t,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Je=w(pe.style,"touchAction"),et=Je!==i,tt="auto",nt="manipulation",it="none",ot="pan-x",rt="pan-y",at=function(){if(!et)return!1;var t={},n=e.CSS&&e.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(i){t[i]=!n||e.CSS.supports("touch-action",i)}),t}();X.prototype={set:function(e){"compute"==e&&(e=this.compute()),et&&this.manager.element.style&&at[e]&&(this.manager.element.style[Je]=e),this.actions=e.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var e=[];return a(this.manager.recognizers,function(t){c(t.options.enable,[t])&&(e=e.concat(t.getTouchAction()))}),Z(e.join(" "))},preventDefaults:function(e){var t=e.srcEvent,n=e.offsetDirection;if(this.manager.session.prevented)return void t.preventDefault();var i=this.actions,o=m(i,it)&&!at[it],r=m(i,rt)&&!at[rt],a=m(i,ot)&&!at[ot];if(o){var s=1===e.pointers.length,l=e.distance<2,u=e.deltaTime<250;if(s&&l&&u)return}return a&&r?void 0:o||r&&n&Le||a&&n&Ve?this.preventSrc(t):void 0},preventSrc:function(e){this.manager.session.prevented=!0,e.preventDefault()}};var st=1,lt=2,ut=4,ct=8,dt=ct,pt=16;U.prototype={defaults:{},set:function(e){return ce(this.options,e),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(e){if(r(e,"recognizeWith",this))return this;var t=this.simultaneous;return e=K(e,this),t[e.id]||(t[e.id]=e,e.recognizeWith(this)),this},dropRecognizeWith:function(e){return r(e,"dropRecognizeWith",this)?this:(e=K(e,this),delete this.simultaneous[e.id],this)},requireFailure:function(e){if(r(e,"requireFailure",this))return this;var t=this.requireFail;return e=K(e,this),g(t,e)===-1&&(t.push(e),e.requireFailure(this)),this},dropRequireFailure:function(e){if(r(e,"dropRequireFailure",this))return this;e=K(e,this);var t=g(this.requireFail,e);return t>-1&&this.requireFail.splice(t,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(e){return!!this.simultaneous[e.id]},emit:function(e){function t(t){n.manager.emit(t,e)}var n=this,i=this.state;i<ct&&t(n.options.event+G(i)),t(n.options.event),e.additionalEvent&&t(e.additionalEvent),i>=ct&&t(n.options.event+G(i))},tryEmit:function(e){if(this.canEmit())return this.emit(e);this.state=32},canEmit:function(){for(var e=0;e<this.requireFail.length;){if(!(this.requireFail[e].state&(32|st)))return!1;e++}return!0},recognize:function(e){var t=ce({},e);if(!c(this.options.enable,[this,t]))return this.reset(),void(this.state=32);this.state&(dt|pt|32)&&(this.state=st),this.state=this.process(t),this.state&(lt|ut|ct|pt)&&this.tryEmit(t)},process:function(e){},getTouchAction:function(){},reset:function(){}},l(J,U,{defaults:{pointers:1},attrTest:function(e){var t=this.options.pointers;return 0===t||e.pointers.length===t},process:function(e){var t=this.state,n=e.eventType,i=t&(lt|ut),o=this.attrTest(e);return i&&(n&ke||!o)?t|pt:i||o?n&Pe?t|ct:t&lt?t|ut:lt:32}}),l(ee,J,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ne},getTouchAction:function(){var e=this.options.direction,t=[];return e&Le&&t.push(rt),e&Ve&&t.push(ot),t},directionTest:function(e){var t=this.options,n=!0,i=e.distance,o=e.direction,r=e.deltaX,a=e.deltaY;return o&t.direction||(t.direction&Le?(o=0===r?Ae:r<0?Oe:Me,n=r!=this.pX,i=Math.abs(e.deltaX)):(o=0===a?Ae:a<0?De:Fe,n=a!=this.pY,i=Math.abs(e.deltaY))),e.direction=o,n&&i>t.threshold&&o&t.direction},attrTest:function(e){return J.prototype.attrTest.call(this,e)&&(this.state&lt||!(this.state&lt)&&this.directionTest(e))},emit:function(e){this.pX=e.deltaX,this.pY=e.deltaY;var t=Q(e.direction);t&&(e.additionalEvent=this.options.event+t),this._super.emit.call(this,e)}}),l(te,J,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[it]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||this.state&lt)},emit:function(e){if(1!==e.scale){var t=e.scale<1?"in":"out";e.additionalEvent=this.options.event+t}this._super.emit.call(this,e)}}),l(ne,U,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[tt]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,i=e.distance<t.threshold,r=e.deltaTime>t.time;if(this._input=e,!i||!n||e.eventType&(Pe|ke)&&!r)this.reset();else if(e.eventType&Ee)this.reset(),this._timer=o(function(){this.state=dt,this.tryEmit()},t.time,this);else if(e.eventType&Pe)return dt;return 32},reset:function(){clearTimeout(this._timer)},emit:function(e){this.state===dt&&(e&&e.eventType&Pe?this.manager.emit(this.options.event+"up",e):(this._input.timeStamp=ve(),this.manager.emit(this.options.event,this._input)))}}),l(ie,J,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[it]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||this.state&lt)}}),l(oe,J,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Le|Ve,pointers:1},getTouchAction:function(){return ee.prototype.getTouchAction.call(this)},attrTest:function(e){var t,n=this.options.direction;return n&(Le|Ve)?t=e.overallVelocity:n&Le?t=e.overallVelocityX:n&Ve&&(t=e.overallVelocityY),this._super.attrTest.call(this,e)&&n&e.offsetDirection&&e.distance>this.options.threshold&&e.maxPointers==this.options.pointers&&me(t)>this.options.velocity&&e.eventType&Pe},emit:function(e){var t=Q(e.offsetDirection);t&&this.manager.emit(this.options.event+t,e),this.manager.emit(this.options.event,e)}}),l(re,U,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[nt]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,i=e.distance<t.threshold,r=e.deltaTime<t.time;if(this.reset(),e.eventType&Ee&&0===this.count)return this.failTimeout();if(i&&r&&n){if(e.eventType!=Pe)return this.failTimeout();var a=!this.pTime||e.timeStamp-this.pTime<t.interval,s=!this.pCenter||F(this.pCenter,e.center)<t.posThreshold;this.pTime=e.timeStamp,this.pCenter=e.center,s&&a?this.count+=1:this.count=1,this._input=e;if(0===this.count%t.taps)return this.hasRequireFailures()?(this._timer=o(function(){this.state=dt,this.tryEmit()},t.interval,this),lt):dt}return 32},failTimeout:function(){return this._timer=o(function(){this.state=32},this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==dt&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ae.VERSION="2.0.7",ae.defaults={domEvents:!1,touchAction:"compute",enable:!0,inputTarget:null,inputClass:null,preset:[[ie,{enable:!1}],[te,{enable:!1},["rotate"]],[oe,{direction:Le}],[ee,{direction:Le},["swipe"]],[re],[re,{event:"doubletap",taps:2},["tap"]],[ne]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};se.prototype={set:function(e){return ce(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this},stop:function(e){this.session.stopped=e?2:1},recognize:function(e){var t=this.session;if(!t.stopped){this.touchAction.preventDefaults(e);var n,i=this.recognizers,o=t.curRecognizer;(!o||o&&o.state&dt)&&(o=t.curRecognizer=null);for(var r=0;r<i.length;)n=i[r],2===t.stopped||o&&n!=o&&!n.canRecognizeWith(o)?n.reset():n.recognize(e),!o&&n.state&(lt|ut|ct)&&(o=t.curRecognizer=n),r++}},get:function(e){if(e instanceof U)return e;for(var t=this.recognizers,n=0;n<t.length;n++)if(t[n].options.event==e)return t[n];return null},add:function(e){if(r(e,"add",this))return this;var t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e},remove:function(e){if(r(e,"remove",this))return this;if(e=this.get(e)){var t=this.recognizers,n=g(t,e);n!==-1&&(t.splice(n,1),this.touchAction.update())}return this},on:function(e,t){if(e!==i&&t!==i){var n=this.handlers;return a(v(e),function(e){n[e]=n[e]||[],n[e].push(t)}),this}},off:function(e,t){if(e!==i){var n=this.handlers;return a(v(e),function(e){t?n[e]&&n[e].splice(g(n[e],t),1):delete n[e]}),this}},emit:function(e,t){this.options.domEvents&&ue(e,t);var n=this.handlers[e]&&this.handlers[e].slice();if(n&&n.length){t.type=e,t.preventDefault=function(){t.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](t),i++}},destroy:function(){this.element&&le(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},ce(ae,{INPUT_START:Ee,INPUT_MOVE:Ie,INPUT_END:Pe,INPUT_CANCEL:ke,STATE_POSSIBLE:st,STATE_BEGAN:lt,STATE_CHANGED:ut,STATE_ENDED:ct,STATE_RECOGNIZED:dt,STATE_CANCELLED:pt,STATE_FAILED:32,DIRECTION_NONE:Ae,DIRECTION_LEFT:Oe,DIRECTION_RIGHT:Me,DIRECTION_UP:De,DIRECTION_DOWN:Fe,DIRECTION_HORIZONTAL:Le,DIRECTION_VERTICAL:Ve,DIRECTION_ALL:Ne,Manager:se,Input:T,TouchAction:X,TouchInput:j,MouseInput:R,PointerEventInput:_,TouchMouseInput:W,SingleTouchInput:z,Recognizer:U,AttrRecognizer:J,Tap:re,Pan:ee,Swipe:oe,Pinch:te,Rotate:ie,Press:ne,on:p,off:f,each:a,merge:ye,extend:ge,assign:ce,inherit:l,bindFn:u,prefixed:w}),(void 0!==e?e:"undefined"!=typeof self?self:{}).Hammer=ae,"function"==typeof define&&define.amd?define(function(){return ae}):"undefined"!=typeof module&&module.exports?module.exports=ae:e.Hammer=ae}(window,document),function(e){"function"==typeof define&&define.amd?define(["jquery","hammerjs"],e):"object"==typeof exports?e(require("jquery"),require("hammerjs")):e(jQuery,Hammer)}(function(e,t){function n(n,i){var o=e(n);o.data("hammer")||o.data("hammer",new t(o[0],i))}e.fn.hammer=function(e){return this.each(function(){n(this,e)})},t.Manager.prototype.emit=function(t){return function(n,i){t.call(this,n,i),e(this.element).trigger({type:n,gesture:i})}}(t.Manager.prototype.emit)}),function(e){e(document).ready(function(){function t(t){var n=t.css("font-family"),o=t.css("font-size");o&&i.css("font-size",o),n&&i.css("font-family",n),"off"===t.attr("wrap")&&i.css("overflow-wrap","normal").css("white-space","pre"),i.text(t.val()+"\n");var r=i.html().replace(/\n/g,"<br>");i.html(r),t.is(":visible")?i.css("width",t.width()):i.css("width",e(window).width()/2),t.css("height",i.height())}Materialize.updateTextFields=function(){e("input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea").each(function(t,n){e(n).val().length>0||n.autofocus||void 0!==e(this).attr("placeholder")||e(n)[0].validity.badInput===!0?e(this).siblings("label, i").addClass("active"):e(this).siblings("label, i").removeClass("active")})};var n="input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";e(document).on("change",n,function(){0===e(this).val().length&&void 0===e(this).attr("placeholder")||e(this).siblings("label").addClass("active"),validate_field(e(this))}),e(document).ready(function(){Materialize.updateTextFields()}),e(document).on("reset",function(t){var i=e(t.target);i.is("form")&&(i.find(n).removeClass("valid").removeClass("invalid"),i.find(n).each(function(){""===e(this).attr("value")&&e(this).siblings("label, i").removeClass("active")}),i.find("select.initialized").each(function(){var e=i.find("option[selected]").text();i.siblings("input.select-dropdown").val(e)}))}),e(document).on("focus",n,function(){e(this).siblings("label, i").addClass("active")}),e(document).on("blur",n,function(){var t=e(this);0===t.val().length&&t[0].validity.badInput!==!0&&void 0===t.attr("placeholder")&&t.siblings("label, i").removeClass("active"),0===t.val().length&&t[0].validity.badInput!==!0&&void 0!==t.attr("placeholder")&&t.siblings("i").removeClass("active"),validate_field(t)}),window.validate_field=function(e){var t=void 0!==e.attr("length"),n=parseInt(e.attr("length")),i=e.val().length;0===e.val().length&&e[0].validity.badInput===!1?e.hasClass("validate")&&(e.removeClass("valid"),e.removeClass("invalid")):e.hasClass("validate")&&(e.is(":valid")&&t&&i<=n||e.is(":valid")&&!t?(e.removeClass("invalid"),e.addClass("valid")):(e.removeClass("valid"),e.addClass("invalid")))};var i=e(".hiddendiv").first();i.length||(i=e('<div class="hiddendiv common"></div>'),e("body").append(i));e(".materialize-textarea").each(function(){var n=e(this);n.val().length&&t(n)}),e("body").on("keyup keydown autoresize",".materialize-textarea",function(){t(e(this))}),e(document).on("change",'.file-field input[type="file"]',function(){for(var t=e(this).closest(".file-field"),n=t.find("input.file-path"),i=e(this)[0].files,o=[],r=0;r<i.length;r++)o.push(i[r].name);n.val(o.join(", ")),n.trigger("change")});var o,r="input[type=range]",a=!1;e(r).each(function(){var t=e('<span class="thumb"><span class="value"></span></span>');e(this).after(t)});e(document).on("change",r,function(t){e(this).siblings(".thumb").find(".value").html(e(this).val())}),e(document).on("input mousedown touchstart",r,function(t){var n=e(this).siblings(".thumb"),i=e(this).outerWidth();n.length<=0&&(n=e('<span class="thumb"><span class="value"></span></span>'),e(this).after(n)),n.find(".value").html(e(this).val()),a=!0,e(this).addClass("active"),n.hasClass("active")||n.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"}),"input"!==t.type&&(o=void 0===t.pageX||null===t.pageX?t.originalEvent.touches[0].pageX-e(this).offset().left:t.pageX-e(this).offset().left,o<0?o=0:o>i&&(o=i),n.addClass("active").css("left",o)),n.find(".value").html(e(this).val())}),e(document).on("mouseup touchend",".range-field",function(){a=!1,e(this).removeClass("active")}),e(document).on("mousemove touchmove",".range-field",function(t){var n,i=e(this).children(".thumb");if(a){i.hasClass("active")||i.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"}),n=void 0===t.pageX||null===t.pageX?t.originalEvent.touches[0].pageX-e(this).offset().left:t.pageX-e(this).offset().left;var o=e(this).outerWidth();n<0?n=0:n>o&&(n=o),i.addClass("active").css("left",n),i.find(".value").html(i.siblings(r).val())}}),e(document).on("mouseout touchleave",".range-field",function(){if(!a){var t=e(this).children(".thumb");t.hasClass("active")&&t.velocity({height:"0",width:"0",top:"10px",marginLeft:"-6px"},{duration:100}),t.removeClass("active")}})}),e.fn.material_select=function(t){function n(e,t,n){var o=e.indexOf(t),r=o===-1;return r?e.push(t):e.splice(o,1),n.siblings("ul.dropdown-content").find("li").eq(t).toggleClass("active"),n.find("option").eq(t).prop("selected",r),i(e,n),r}function i(e,t){for(var n="",i=0,o=e.length;i<o;i++){var r=t.find("option").eq(e[i]).text();n+=0===i?r:", "+r}""===n&&(n=t.find("option:disabled").eq(0).text()),t.siblings("input.select-dropdown").val(n)}e(this).each(function(){var i=e(this);if(!i.hasClass("browser-default")){var o=!!i.attr("multiple"),r=i.data("select-id");if(r&&(i.parent().find("span.caret").remove(),i.parent().find("input").remove(),i.unwrap(),e("ul#select-options-"+r).remove()),"destroy"===t)return void i.data("select-id",null).removeClass("initialized");var a=Materialize.guid();i.data("select-id",a);var s=e('<div class="select-wrapper"></div>');s.addClass(i.attr("class"));var l=e('<ul id="select-options-'+a+'" class="dropdown-content select-dropdown '+(o?"multiple-select-dropdown":"")+'"></ul>'),u=i.children("option, optgroup"),c=[],d=!1,p=i.find("option:selected").html()||i.find("option:first").html()||"",f=function(){var t=e(this).closest("ul"),n=e(this).val();t.find("li").find("span.filtrable").each(function(){"string"==typeof this.outerText&&(this.outerText.toLowerCase().indexOf(n.toLowerCase())===-1?(e(this).hide(),e(this).parent().hide()):(e(this).show(),e(this).parent().show()))})},h=!!i.attr("searchable");h&&function(){var t=i.attr("searchable"),n=e('<span><input type="text" class="search" style="margin: 5px 0px 16px 15px; width: 96%;" placeholder="'+t+'"></span>');l.append(n),n.find(".search").keyup(f)}();var m=function(t,n,i){var o=n.is(":disabled")?"disabled ":"",r="optgroup-option"===i?"optgroup-option ":"",a=n.data("icon"),s=n.attr("class");if(a){var u="";return s&&(u=' class="'+s+'"'),"multiple"===i?l.append(e('<li class="'+o+'"><img alt="" src="'+a+'"'+u+'><span class="filtrable"><input type="checkbox"'+o+"/><label></label>"+n.html()+"</span></li>")):l.append(e('<li class="'+o+r+'"><img alt="" src="'+a+'"'+u+'><span class="filtrable">'+n.html()+"</span></li>")),!0}"multiple"===i?l.append(e('<li class="'+o+'"><span class="filtrable"><input type="checkbox"'+o+"/><label></label>"+n.html()+"</span></li>")):l.append(e('<li class="'+o+r+'"><span class="filtrable">'+n.html()+"</span></li>"))};u.length&&u.each(function(){if(e(this).is("option"))o?m(0,e(this),"multiple"):m(0,e(this));else if(e(this).is("optgroup")){var t=e(this).children("option");l.append(e('<li class="optgroup"><span>'+e(this).attr("label")+"</span></li>")),t.each(function(){m(0,e(this),"optgroup-option")})}}),l.find("li:not(.optgroup)").each(function(r){e(this).click(function(a){if(!e(this).hasClass("disabled")&&!e(this).hasClass("optgroup")){var s=!0;o?(e('input[type="checkbox"]',this).prop("checked",function(e,t){return!t}),s=n(c,e(this).index()-1,i),y.trigger("focus")):(l.find("li").removeClass("active"),e(this).toggleClass("active"),y.val(e(this).text())),b(l,e(this)),i.find("option").eq(r).prop("selected",s),i.trigger("change"),void 0!==t&&t()}a.stopPropagation()})}),i.wrap(s);var v=e('<span class="caret">&#9660;</span>');i.is(":disabled")&&v.addClass("disabled");var g=p.replace(/"/g,"&quot;"),y=e('<input type="text" class="select-dropdown" readonly="true" '+(i.is(":disabled")?"disabled":"")+' data-activates="select-options-'+a+'" value="'+g+'"/>');i.before(y),y.before(v),y.after(l),i.is(":disabled")||y.dropdown({hover:!1,closeOnClick:!1}),i.attr("tabindex")&&e(y[0]).attr("tabindex",i.attr("tabindex")),i.addClass("initialized"),y.on({focus:function(){if(e("ul.select-dropdown").not(l[0]).is(":visible")&&e("input.select-dropdown").trigger("close"),!l.is(":visible")){e(this).trigger("open",["focus"]);var t=e(this).val();b(l,l.find("li").filter(function(){return e(this).text().toLowerCase()===t.toLowerCase()})[0])}},click:function(e){e.stopPropagation()}}),y.on("blur",function(){o||h||e(this).trigger("close"),l.find("li.selected").removeClass("selected")}),!o&&h&&l.find("li").on("click",function(){y.trigger("close")}),l.hover(function(){d=!0},function(){d=!1}),e(window).on({click:function(){(o||h)&&(d||y.trigger("close"))}}),o&&i.find("option:selected:not(:disabled)").each(function(){var t=e(this).index();n(c,t,i),l.find("li").eq(t).find(":checkbox").prop("checked",!0)});var b=function(t,n){if(n){t.find("li.selected").removeClass("selected");var i=e(n);i.addClass("selected"),l.scrollTo(i)}},w=[],x=function(t){if(9==t.which)return void y.trigger("close");if(40==t.which&&!l.is(":visible"))return void y.trigger("open");if(13!=t.which||l.is(":visible")){t.preventDefault();var n=String.fromCharCode(t.which).toLowerCase(),i=[9,13,27,38,40];if(n&&i.indexOf(t.which)===-1){w.push(n);var r=w.join(""),a=l.find("li").filter(function(){return 0===e(this).text().toLowerCase().indexOf(r)})[0];a&&b(l,a)}if(13==t.which){var s=l.find("li.selected:not(.disabled)")[0];s&&(e(s).trigger("click"),o||y.trigger("close"))}40==t.which&&(a=l.find("li.selected").length?l.find("li.selected").next("li:not(.disabled)")[0]:l.find("li:not(.disabled)")[0],b(l,a)),27==t.which&&y.trigger("close"),38==t.which&&(a=l.find("li.selected").prev("li:not(.disabled)")[0])&&b(l,a),setTimeout(function(){w=[]},1e3)}};y.on("keydown",x)}})}}(jQuery),jQuery("select").siblings("input.select-dropdown").on("mousedown",function(e){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(e.clientX>=e.target.clientWidth||e.clientY>=e.target.clientHeight)&&e.preventDefault()}),function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.PhotoSwipe=t()}(this,function(){"use strict";return function(e,t,n,i){var o={features:null,bind:function(e,t,n,i){var o=(i?"remove":"add")+"EventListener";t=t.split(" ");for(var r=0;r<t.length;r++)t[r]&&e[o](t[r],n,!1)},isArray:function(e){return e instanceof Array},createEl:function(e,t){var n=document.createElement(t||"div");return e&&(n.className=e),n},getScrollY:function(){var e=window.pageYOffset;return void 0!==e?e:document.documentElement.scrollTop},unbind:function(e,t,n){o.bind(e,t,n,!0)},removeClass:function(e,t){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(e,t){o.hasClass(e,t)||(e.className+=(e.className?" ":"")+t)},hasClass:function(e,t){return e.className&&new RegExp("(^|\\s)"+t+"(\\s|$)").test(e.className)},getChildByClass:function(e,t){for(var n=e.firstChild;n;){if(o.hasClass(n,t))return n;n=n.nextSibling}},arraySearch:function(e,t,n){for(var i=e.length;i--;)if(e[i][n]===t)return i;return-1},extend:function(e,t,n){for(var i in t)if(t.hasOwnProperty(i)){if(n&&e.hasOwnProperty(i))continue;e[i]=t[i]}},easing:{sine:{out:function(e){return Math.sin(e*(Math.PI/2))},inOut:function(e){return-(Math.cos(Math.PI*e)-1)/2}},cubic:{out:function(e){return--e*e*e+1}}},detectFeatures:function(){if(o.features)return o.features;var e=o.createEl(),t=e.style,n="",i={};if(i.oldIE=document.all&&!document.addEventListener,i.touch="ontouchstart"in window,window.requestAnimationFrame&&(i.raf=window.requestAnimationFrame,i.caf=window.cancelAnimationFrame),i.pointerEvent=navigator.pointerEnabled||navigator.msPointerEnabled,!i.pointerEvent){var r=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var a=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);a&&a.length>0&&(a=parseInt(a[1],10))>=1&&8>a&&(i.isOldIOSPhone=!0)}var s=r.match(/Android\s([0-9\.]*)/),l=s?s[1]:0;l=parseFloat(l),l>=1&&(4.4>l&&(i.isOldAndroid=!0),i.androidVersion=l),i.isMobileOpera=/opera mini|opera mobi/i.test(r)}for(var u,c,d=["transform","perspective","animationName"],p=["","webkit","Moz","ms","O"],f=0;4>f;f++){n=p[f];for(var h=0;3>h;h++)u=d[h],c=n+(n?u.charAt(0).toUpperCase()+u.slice(1):u),!i[u]&&c in t&&(i[u]=c);n&&!i.raf&&(n=n.toLowerCase(),i.raf=window[n+"RequestAnimationFrame"],i.raf&&(i.caf=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]))}if(!i.raf){var m=0;i.raf=function(e){var t=(new Date).getTime(),n=Math.max(0,16-(t-m)),i=window.setTimeout(function(){e(t+n)},n);return m=t+n,i},i.caf=function(e){clearTimeout(e)}}return i.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,o.features=i,i}};o.detectFeatures(),o.features.oldIE&&(o.bind=function(e,t,n,i){t=t.split(" ");for(var o,r=(i?"detach":"attach")+"Event",a=function(){n.handleEvent.call(n)},s=0;s<t.length;s++)if(o=t[s])if("object"==typeof n&&n.handleEvent){if(i){if(!n["oldIE"+o])return!1}else n["oldIE"+o]=a;e[r]("on"+o,n["oldIE"+o])}else e[r]("on"+o,n)});var r=this,a={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(e){return"A"===e.tagName},getDoubleTapZoom:function(e,t){return e?1:t.initialZoomLevel<.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};o.extend(a,i);var s,l,u,c,d,p,f,h,m,v,g,y,b,w,x,C,T,S,E,I,P,k,A,O,M,D,F,L,V,N,R,_,z,H,j,$,W,q,Y,B,X,Z,U,G,Q,K,J,ee,te,ne,ie,oe,re,ae,se,le,ue=function(){return{x:0,y:0}},ce=ue(),de=ue(),pe=ue(),fe={},he=0,me={},ve=ue(),ge=0,ye=!0,be=[],we={},xe=!1,Ce=function(e,t){o.extend(r,t.publicMethods),be.push(e)},Te=function(e){var t=Ut();return e>t-1?e-t:0>e?t+e:e},Se={},Ee=function(e,t){return Se[e]||(Se[e]=[]),Se[e].push(t)},Ie=function(e){var t=Se[e];if(t){var n=Array.prototype.slice.call(arguments);n.shift();for(var i=0;i<t.length;i++)t[i].apply(r,n)}},Pe=function(){return(new Date).getTime()},ke=function(e){ae=e,r.bg.style.opacity=e*a.bgOpacity},Ae=function(e,t,n,i,o){(!xe||o&&o!==r.currItem)&&(i/=o?o.fitRatio:r.currItem.fitRatio),e[k]=y+t+"px, "+n+"px"+b+" scale("+i+")"},Oe=function(e){te&&(e&&(v>r.currItem.fitRatio?xe||(ln(r.currItem,!1,!0),xe=!0):xe&&(ln(r.currItem),xe=!1)),Ae(te,pe.x,pe.y,v))},Me=function(e){e.container&&Ae(e.container.style,e.initialPosition.x,e.initialPosition.y,e.initialZoomLevel,e)
},De=function(e,t){t[k]=y+e+"px, 0px"+b},Fe=function(e,t){if(!a.loop&&t){var n=c+(ve.x*he-e)/ve.x,i=Math.round(e-ht.x);(0>n&&i>0||n>=Ut()-1&&0>i)&&(e=ht.x+i*a.mainScrollEndFriction)}ht.x=e,De(e,d)},Le=function(e,t){var n=mt[e]-me[e];return de[e]+ce[e]+n-n*(t/g)},Ve=function(e,t){e.x=t.x,e.y=t.y,t.id&&(e.id=t.id)},Ne=function(e){e.x=Math.round(e.x),e.y=Math.round(e.y)},Re=null,_e=function(){Re&&(o.unbind(document,"mousemove",_e),o.addClass(e,"pswp--has_mouse"),a.mouseUsed=!0,Ie("mouseUsed")),Re=setTimeout(function(){Re=null},100)},ze=function(){o.bind(document,"keydown",r),R.transform&&o.bind(r.scrollWrap,"click",r),a.mouseUsed||o.bind(document,"mousemove",_e),o.bind(window,"resize scroll",r),Ie("bindEvents")},He=function(){o.unbind(window,"resize",r),o.unbind(window,"scroll",m.scroll),o.unbind(document,"keydown",r),o.unbind(document,"mousemove",_e),R.transform&&o.unbind(r.scrollWrap,"click",r),q&&o.unbind(window,f,r),Ie("unbindEvents")},je=function(e,t){var n=on(r.currItem,fe,e);return t&&(ee=n),n},$e=function(e){return e||(e=r.currItem),e.initialZoomLevel},We=function(e){return e||(e=r.currItem),e.w>0?a.maxSpreadZoom:1},qe=function(e,t,n,i){return i===r.currItem.initialZoomLevel?(n[e]=r.currItem.initialPosition[e],!0):(n[e]=Le(e,i),n[e]>t.min[e]?(n[e]=t.min[e],!0):n[e]<t.max[e]&&(n[e]=t.max[e],!0))},Ye=function(){if(k){return y="translate"+(R.perspective&&!O?"3d(":"("),void(b=R.perspective?", 0px)":")")}k="left",o.addClass(e,"pswp--ie"),De=function(e,t){t.left=e+"px"},Me=function(e){var t=e.fitRatio>1?1:e.fitRatio,n=e.container.style,i=t*e.w,o=t*e.h;n.width=i+"px",n.height=o+"px",n.left=e.initialPosition.x+"px",n.top=e.initialPosition.y+"px"},Oe=function(){if(te){var e=te,t=r.currItem,n=t.fitRatio>1?1:t.fitRatio,i=n*t.w,o=n*t.h;e.width=i+"px",e.height=o+"px",e.left=pe.x+"px",e.top=pe.y+"px"}}},Be=function(e){var t="";a.escKey&&27===e.keyCode?t="close":a.arrowKeys&&(37===e.keyCode?t="prev":39===e.keyCode&&(t="next")),t&&(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey||(e.preventDefault?e.preventDefault():e.returnValue=!1,r[t]()))},Xe=function(e){e&&(X||B||ne||$)&&(e.preventDefault(),e.stopPropagation())},Ze=function(){r.setScrollOffset(0,o.getScrollY())},Ue={},Ge=0,Qe=function(e){Ue[e]&&(Ue[e].raf&&D(Ue[e].raf),Ge--,delete Ue[e])},Ke=function(e){Ue[e]&&Qe(e),Ue[e]||(Ge++,Ue[e]={})},Je=function(){for(var e in Ue)Ue.hasOwnProperty(e)&&Qe(e)},et=function(e,t,n,i,o,r,a){var s,l=Pe();Ke(e);var u=function(){if(Ue[e]){if((s=Pe()-l)>=i)return Qe(e),r(n),void(a&&a());r((n-t)*o(s/i)+t),Ue[e].raf=M(u)}};u()},tt={shout:Ie,listen:Ee,viewportSize:fe,options:a,isMainScrollAnimating:function(){return ne},getZoomLevel:function(){return v},getCurrentIndex:function(){return c},isDragging:function(){return q},isZooming:function(){return Q},setScrollOffset:function(e,t){me.x=e,N=me.y=t,Ie("updateScrollOffset",me)},applyZoomPan:function(e,t,n,i){pe.x=t,pe.y=n,v=e,Oe(i)},init:function(){if(!s&&!l){var n;r.framework=o,r.template=e,r.bg=o.getChildByClass(e,"pswp__bg"),F=e.className,s=!0,R=o.detectFeatures(),M=R.raf,D=R.caf,k=R.transform,V=R.oldIE,r.scrollWrap=o.getChildByClass(e,"pswp__scroll-wrap"),r.container=o.getChildByClass(r.scrollWrap,"pswp__container"),d=r.container.style,r.itemHolders=C=[{el:r.container.children[0],wrap:0,index:-1},{el:r.container.children[1],wrap:0,index:-1},{el:r.container.children[2],wrap:0,index:-1}],C[0].el.style.display=C[2].el.style.display="none",Ye(),m={resize:r.updateSize,scroll:Ze,keydown:Be,click:Xe};var i=R.isOldIOSPhone||R.isOldAndroid||R.isMobileOpera;for(R.animationName&&R.transform&&!i||(a.showAnimationDuration=a.hideAnimationDuration=0),n=0;n<be.length;n++)r["init"+be[n]]();if(t){(r.ui=new t(r,o)).init()}Ie("firstUpdate"),c=c||a.index||0,(isNaN(c)||0>c||c>=Ut())&&(c=0),r.currItem=Zt(c),(R.isOldIOSPhone||R.isOldAndroid)&&(ye=!1),e.setAttribute("aria-hidden","false"),a.modal&&(ye?e.style.position="fixed":(e.style.position="absolute",e.style.top=o.getScrollY()+"px")),void 0===N&&(Ie("initialLayout"),N=L=o.getScrollY());var u="pswp--open ";for(a.mainClass&&(u+=a.mainClass+" "),a.showHideOpacity&&(u+="pswp--animate_opacity "),u+=O?"pswp--touch":"pswp--notouch",u+=R.animationName?" pswp--css_animation":"",u+=R.svg?" pswp--svg":"",o.addClass(e,u),r.updateSize(),p=-1,ge=null,n=0;3>n;n++)De((n+p)*ve.x,C[n].el.style);V||o.bind(r.scrollWrap,h,r),Ee("initialZoomInEnd",function(){r.setContent(C[0],c-1),r.setContent(C[2],c+1),C[0].el.style.display=C[2].el.style.display="block",a.focus&&e.focus(),ze()}),r.setContent(C[1],c),r.updateCurrItem(),Ie("afterInit"),ye||(w=setInterval(function(){Ge||q||Q||v!==r.currItem.initialZoomLevel||r.updateSize()},1e3)),o.addClass(e,"pswp--visible")}},close:function(){s&&(s=!1,l=!0,Ie("close"),He(),Qt(r.currItem,null,!0,r.destroy))},destroy:function(){Ie("destroy"),qt&&clearTimeout(qt),e.setAttribute("aria-hidden","true"),e.className=F,w&&clearInterval(w),o.unbind(r.scrollWrap,h,r),o.unbind(window,"scroll",r),wt(),Je(),Se=null},panTo:function(e,t,n){n||(e>ee.min.x?e=ee.min.x:e<ee.max.x&&(e=ee.max.x),t>ee.min.y?t=ee.min.y:t<ee.max.y&&(t=ee.max.y)),pe.x=e,pe.y=t,Oe()},handleEvent:function(e){e=e||window.event,m[e.type]&&m[e.type](e)},goTo:function(e){e=Te(e);var t=e-c;ge=t,c=e,r.currItem=Zt(c),he-=t,Fe(ve.x*he),Je(),ne=!1,r.updateCurrItem()},next:function(){r.goTo(c+1)},prev:function(){r.goTo(c-1)},updateCurrZoomItem:function(e){if(e&&Ie("beforeChange",0),C[1].el.children.length){var t=C[1].el.children[0];te=o.hasClass(t,"pswp__zoom-wrap")?t.style:null}else te=null;ee=r.currItem.bounds,g=v=r.currItem.initialZoomLevel,pe.x=ee.center.x,pe.y=ee.center.y,e&&Ie("afterChange")},invalidateCurrItems:function(){x=!0;for(var e=0;3>e;e++)C[e].item&&(C[e].item.needsUpdate=!0)},updateCurrItem:function(e){if(0!==ge){var t,n=Math.abs(ge);if(!(e&&2>n)){r.currItem=Zt(c),xe=!1,Ie("beforeChange",ge),n>=3&&(p+=ge+(ge>0?-3:3),n=3);for(var i=0;n>i;i++)ge>0?(t=C.shift(),C[2]=t,p++,De((p+2)*ve.x,t.el.style),r.setContent(t,c-n+i+1+1)):(t=C.pop(),C.unshift(t),p--,De(p*ve.x,t.el.style),r.setContent(t,c+n-i-1-1));if(te&&1===Math.abs(ge)){var o=Zt(T);o.initialZoomLevel!==v&&(on(o,fe),ln(o),Me(o))}ge=0,r.updateCurrZoomItem(),T=c,Ie("afterChange")}}},updateSize:function(t){if(!ye&&a.modal){var n=o.getScrollY();if(N!==n&&(e.style.top=n+"px",N=n),!t&&we.x===window.innerWidth&&we.y===window.innerHeight)return;we.x=window.innerWidth,we.y=window.innerHeight,e.style.height=we.y+"px"}if(fe.x=r.scrollWrap.clientWidth,fe.y=r.scrollWrap.clientHeight,Ze(),ve.x=fe.x+Math.round(fe.x*a.spacing),ve.y=fe.y,Fe(ve.x*he),Ie("beforeResize"),void 0!==p){for(var i,s,l,u=0;3>u;u++)i=C[u],De((u+p)*ve.x,i.el.style),l=c+u-1,a.loop&&Ut()>2&&(l=Te(l)),s=Zt(l),s&&(x||s.needsUpdate||!s.bounds)?(r.cleanSlide(s),r.setContent(i,l),1===u&&(r.currItem=s,r.updateCurrZoomItem(!0)),s.needsUpdate=!1):-1===i.index&&l>=0&&r.setContent(i,l),s&&s.container&&(on(s,fe),ln(s),Me(s));x=!1}g=v=r.currItem.initialZoomLevel,ee=r.currItem.bounds,ee&&(pe.x=ee.center.x,pe.y=ee.center.y,Oe(!0)),Ie("resize")},zoomTo:function(e,t,n,i,r){t&&(g=v,mt.x=Math.abs(t.x)-pe.x,mt.y=Math.abs(t.y)-pe.y,Ve(de,pe));var a=je(e,!1),s={};qe("x",a,s,e),qe("y",a,s,e);var l=v,u={x:pe.x,y:pe.y};Ne(s);var c=function(t){1===t?(v=e,pe.x=s.x,pe.y=s.y):(v=(e-l)*t+l,pe.x=(s.x-u.x)*t+u.x,pe.y=(s.y-u.y)*t+u.y),r&&r(t),Oe(1===t)};n?et("customZoomTo",0,1,n,i||o.easing.sine.inOut,c):c(1)}},nt={},it={},ot={},rt={},at={},st=[],lt={},ut=[],ct={},dt=0,pt=ue(),ft=0,ht=ue(),mt=ue(),vt=ue(),gt=function(e,t){return e.x===t.x&&e.y===t.y},yt=function(e,t){return Math.abs(e.x-t.x)<25&&Math.abs(e.y-t.y)<25},bt=function(e,t){return ct.x=Math.abs(e.x-t.x),ct.y=Math.abs(e.y-t.y),Math.sqrt(ct.x*ct.x+ct.y*ct.y)},wt=function(){Z&&(D(Z),Z=null)},xt=function(){q&&(Z=M(xt),Rt())},Ct=function(){return!("fit"===a.scaleMode&&v===r.currItem.initialZoomLevel)},Tt=function(e,t){return!(!e||e===document)&&(!(e.getAttribute("class")&&e.getAttribute("class").indexOf("pswp__scroll-wrap")>-1)&&(t(e)?e:Tt(e.parentNode,t)))},St={},Et=function(e,t){return St.prevent=!Tt(e.target,a.isClickableElement),Ie("preventDragEvent",e,t,St),St.prevent},It=function(e,t){return t.x=e.pageX,t.y=e.pageY,t.id=e.identifier,t},Pt=function(e,t,n){n.x=.5*(e.x+t.x),n.y=.5*(e.y+t.y)},kt=function(e,t,n){if(e-z>50){var i=ut.length>2?ut.shift():{};i.x=t,i.y=n,ut.push(i),z=e}},At=function(){var e=pe.y-r.currItem.initialPosition.y;return 1-Math.abs(e/(fe.y/2))},Ot={},Mt={},Dt=[],Ft=function(e){for(;Dt.length>0;)Dt.pop();return A?(le=0,st.forEach(function(e){0===le?Dt[0]=e:1===le&&(Dt[1]=e),le++})):e.type.indexOf("touch")>-1?e.touches&&e.touches.length>0&&(Dt[0]=It(e.touches[0],Ot),e.touches.length>1&&(Dt[1]=It(e.touches[1],Mt))):(Ot.x=e.pageX,Ot.y=e.pageY,Ot.id="",Dt[0]=Ot),Dt},Lt=function(e,t){var n,i,o,s,l=pe[e]+t[e],u=t[e]>0,c=ht.x+t.x,d=ht.x-lt.x;return n=l>ee.min[e]||l<ee.max[e]?a.panEndFriction:1,l=pe[e]+t[e]*n,!a.allowPanToNext&&v!==r.currItem.initialZoomLevel||(te?"h"!==ie||"x"!==e||B||(u?(l>ee.min[e]&&(n=a.panEndFriction,ee.min[e]-l,i=ee.min[e]-de[e]),(0>=i||0>d)&&Ut()>1?(s=c,0>d&&c>lt.x&&(s=lt.x)):ee.min.x!==ee.max.x&&(o=l)):(l<ee.max[e]&&(n=a.panEndFriction,l-ee.max[e],i=de[e]-ee.max[e]),(0>=i||d>0)&&Ut()>1?(s=c,d>0&&c<lt.x&&(s=lt.x)):ee.min.x!==ee.max.x&&(o=l))):s=c,"x"!==e)?void(ne||U||v>r.currItem.fitRatio&&(pe[e]+=t[e]*n)):(void 0!==s&&(Fe(s,!0),U=s!==lt.x),ee.min.x!==ee.max.x&&(void 0!==o?pe.x=o:U||(pe.x+=t.x*n)),void 0!==s)},Vt=function(e){if(!("mousedown"===e.type&&e.button>0)){if(Xt)return void e.preventDefault();if(!W||"mousedown"!==e.type){if(Et(e,!0)&&e.preventDefault(),Ie("pointerDown"),A){var t=o.arraySearch(st,e.pointerId,"id");0>t&&(t=st.length),st[t]={x:e.pageX,y:e.pageY,id:e.pointerId}}var n=Ft(e),i=n.length;G=null,Je(),q&&1!==i||(q=oe=!0,o.bind(window,f,r),j=se=re=$=U=X=Y=B=!1,ie=null,Ie("firstTouchStart",n),Ve(de,pe),ce.x=ce.y=0,Ve(rt,n[0]),Ve(at,rt),lt.x=ve.x*he,ut=[{x:rt.x,y:rt.y}],z=_=Pe(),je(v,!0),wt(),xt()),!Q&&i>1&&!ne&&!U&&(g=v,B=!1,Q=Y=!0,ce.y=ce.x=0,Ve(de,pe),Ve(nt,n[0]),Ve(it,n[1]),Pt(nt,it,vt),mt.x=Math.abs(vt.x)-pe.x,mt.y=Math.abs(vt.y)-pe.y,K=J=bt(nt,it))}}},Nt=function(e){if(e.preventDefault(),A){var t=o.arraySearch(st,e.pointerId,"id");if(t>-1){var n=st[t];n.x=e.pageX,n.y=e.pageY}}if(q){var i=Ft(e);if(ie||X||Q)G=i;else if(ht.x!==ve.x*he)ie="h";else{var r=Math.abs(i[0].x-rt.x)-Math.abs(i[0].y-rt.y);Math.abs(r)>=10&&(ie=r>0?"h":"v",G=i)}}},Rt=function(){if(G){var e=G.length;if(0!==e)if(Ve(nt,G[0]),ot.x=nt.x-rt.x,ot.y=nt.y-rt.y,Q&&e>1){if(rt.x=nt.x,rt.y=nt.y,!ot.x&&!ot.y&&gt(G[1],it))return;Ve(it,G[1]),B||(B=!0,Ie("zoomGestureStarted"));var t=bt(nt,it),n=$t(t);n>r.currItem.initialZoomLevel+r.currItem.initialZoomLevel/15&&(se=!0);var i=1,o=$e(),s=We();if(o>n)if(a.pinchToClose&&!se&&g<=r.currItem.initialZoomLevel){var l=o-n,u=1-l/(o/1.2);ke(u),Ie("onPinchClose",u),re=!0}else i=(o-n)/o,i>1&&(i=1),n=o-i*(o/3);else n>s&&(i=(n-s)/(6*o),i>1&&(i=1),n=s+i*o);0>i&&(i=0),K=t,Pt(nt,it,pt),ce.x+=pt.x-vt.x,ce.y+=pt.y-vt.y,Ve(vt,pt),pe.x=Le("x",n),pe.y=Le("y",n),j=n>v,v=n,Oe()}else{if(!ie)return;if(oe&&(oe=!1,Math.abs(ot.x)>=10&&(ot.x-=G[0].x-at.x),Math.abs(ot.y)>=10&&(ot.y-=G[0].y-at.y)),rt.x=nt.x,rt.y=nt.y,0===ot.x&&0===ot.y)return;if("v"===ie&&a.closeOnVerticalDrag&&!Ct()){ce.y+=ot.y,pe.y+=ot.y;var c=At();return $=!0,Ie("onVerticalDrag",c),ke(c),void Oe()}kt(Pe(),nt.x,nt.y),X=!0,ee=r.currItem.bounds;var d=Lt("x",ot);d||(Lt("y",ot),Ne(pe),Oe())}}},_t=function(e){if(R.isOldAndroid){if(W&&"mouseup"===e.type)return;e.type.indexOf("touch")>-1&&(clearTimeout(W),W=setTimeout(function(){W=0},600))}Ie("pointerUp"),Et(e,!1)&&e.preventDefault();var t;if(A){var n=o.arraySearch(st,e.pointerId,"id");if(n>-1)if(t=st.splice(n,1)[0],navigator.pointerEnabled)t.type=e.pointerType||"mouse";else{var i={4:"mouse",2:"touch",3:"pen"};t.type=i[e.pointerType],t.type||(t.type=e.pointerType||"mouse")}}var s,l=Ft(e),u=l.length;if("mouseup"===e.type&&(u=0),2===u)return G=null,!0;1===u&&Ve(at,l[0]),0!==u||ie||ne||(t||("mouseup"===e.type?t={x:e.pageX,y:e.pageY,type:"mouse"}:e.changedTouches&&e.changedTouches[0]&&(t={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY,type:"touch"})),Ie("touchRelease",e,t));var c=-1;if(0===u&&(q=!1,o.unbind(window,f,r),wt(),Q?c=0:-1!==ft&&(c=Pe()-ft)),ft=1===u?Pe():-1,s=-1!==c&&150>c?"zoom":"swipe",Q&&2>u&&(Q=!1,1===u&&(s="zoomPointerUp"),Ie("zoomGestureEnded")),G=null,X||B||ne||$)if(Je(),H||(H=zt()),H.calculateSwipeSpeed("x"),$){var d=At();if(d<a.verticalDragRange)r.close();else{var p=pe.y,h=ae;et("verticalDrag",0,1,300,o.easing.cubic.out,function(e){pe.y=(r.currItem.initialPosition.y-p)*e+p,ke((1-h)*e+h),Oe()}),Ie("onVerticalDrag",1)}}else{if((U||ne)&&0===u){var m=jt(s,H);if(m)return;s="zoomPointerUp"}if(!ne)return"swipe"!==s?void Wt():void(!U&&v>r.currItem.fitRatio&&Ht(H))}},zt=function(){var e,t,n={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(i){ut.length>1?(e=Pe()-z+50,t=ut[ut.length-2][i]):(e=Pe()-_,t=at[i]),n.lastFlickOffset[i]=rt[i]-t,n.lastFlickDist[i]=Math.abs(n.lastFlickOffset[i]),n.lastFlickDist[i]>20?n.lastFlickSpeed[i]=n.lastFlickOffset[i]/e:n.lastFlickSpeed[i]=0,Math.abs(n.lastFlickSpeed[i])<.1&&(n.lastFlickSpeed[i]=0),n.slowDownRatio[i]=.95,n.slowDownRatioReverse[i]=1-n.slowDownRatio[i],n.speedDecelerationRatio[i]=1},calculateOverBoundsAnimOffset:function(e,t){n.backAnimStarted[e]||(pe[e]>ee.min[e]?n.backAnimDestination[e]=ee.min[e]:pe[e]<ee.max[e]&&(n.backAnimDestination[e]=ee.max[e]),void 0!==n.backAnimDestination[e]&&(n.slowDownRatio[e]=.7,n.slowDownRatioReverse[e]=1-n.slowDownRatio[e],n.speedDecelerationRatioAbs[e]<.05&&(n.lastFlickSpeed[e]=0,n.backAnimStarted[e]=!0,et("bounceZoomPan"+e,pe[e],n.backAnimDestination[e],t||300,o.easing.sine.out,function(t){pe[e]=t,Oe()}))))},calculateAnimOffset:function(e){n.backAnimStarted[e]||(n.speedDecelerationRatio[e]=n.speedDecelerationRatio[e]*(n.slowDownRatio[e]+n.slowDownRatioReverse[e]-n.slowDownRatioReverse[e]*n.timeDiff/10),n.speedDecelerationRatioAbs[e]=Math.abs(n.lastFlickSpeed[e]*n.speedDecelerationRatio[e]),n.distanceOffset[e]=n.lastFlickSpeed[e]*n.speedDecelerationRatio[e]*n.timeDiff,pe[e]+=n.distanceOffset[e])},panAnimLoop:function(){return Ue.zoomPan&&(Ue.zoomPan.raf=M(n.panAnimLoop),n.now=Pe(),n.timeDiff=n.now-n.lastNow,n.lastNow=n.now,n.calculateAnimOffset("x"),n.calculateAnimOffset("y"),Oe(),n.calculateOverBoundsAnimOffset("x"),n.calculateOverBoundsAnimOffset("y"),n.speedDecelerationRatioAbs.x<.05&&n.speedDecelerationRatioAbs.y<.05)?(pe.x=Math.round(pe.x),pe.y=Math.round(pe.y),Oe(),void Qe("zoomPan")):void 0}};return n},Ht=function(e){return e.calculateSwipeSpeed("y"),ee=r.currItem.bounds,e.backAnimDestination={},e.backAnimStarted={},Math.abs(e.lastFlickSpeed.x)<=.05&&Math.abs(e.lastFlickSpeed.y)<=.05?(e.speedDecelerationRatioAbs.x=e.speedDecelerationRatioAbs.y=0,e.calculateOverBoundsAnimOffset("x"),e.calculateOverBoundsAnimOffset("y"),!0):(Ke("zoomPan"),e.lastNow=Pe(),void e.panAnimLoop())},jt=function(e,t){var n;ne||(dt=c);var i;if("swipe"===e){var s=rt.x-at.x,l=t.lastFlickDist.x<10;s>30&&(l||t.lastFlickOffset.x>20)?i=-1:-30>s&&(l||t.lastFlickOffset.x<-20)&&(i=1)}var u;i&&(c+=i,0>c?(c=a.loop?Ut()-1:0,u=!0):c>=Ut()&&(c=a.loop?0:Ut()-1,u=!0),(!u||a.loop)&&(ge+=i,he-=i,n=!0));var d,p=ve.x*he,f=Math.abs(p-ht.x);return n||p>ht.x==t.lastFlickSpeed.x>0?(d=Math.abs(t.lastFlickSpeed.x)>0?f/Math.abs(t.lastFlickSpeed.x):333,d=Math.min(d,400),d=Math.max(d,250)):d=333,dt===c&&(n=!1),ne=!0,Ie("mainScrollAnimStart"),et("mainScroll",ht.x,p,d,o.easing.cubic.out,Fe,function(){Je(),ne=!1,dt=-1,(n||dt!==c)&&r.updateCurrItem(),Ie("mainScrollAnimComplete")}),n&&r.updateCurrItem(!0),n},$t=function(e){return 1/J*e*g},Wt=function(){var e=v,t=$e(),n=We();t>v?e=t:v>n&&(e=n);var i,a=ae;return re&&!j&&!se&&t>v?(r.close(),!0):(re&&(i=function(e){ke((1-a)*e+a)}),r.zoomTo(e,0,200,o.easing.cubic.out,i),!0)};Ce("Gestures",{publicMethods:{initGestures:function(){var e=function(e,t,n,i,o){S=e+t,E=e+n,I=e+i,P=o?e+o:""};A=R.pointerEvent,A&&R.touch&&(R.touch=!1),A?navigator.pointerEnabled?e("pointer","down","move","up","cancel"):e("MSPointer","Down","Move","Up","Cancel"):R.touch?(e("touch","start","move","end","cancel"),O=!0):e("mouse","down","move","up"),f=E+" "+I+" "+P,h=S,A&&!O&&(O=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),r.likelyTouchDevice=O,m[S]=Vt,m[E]=Nt,m[I]=_t,P&&(m[P]=m[I]),R.touch&&(h+=" mousedown",f+=" mousemove mouseup",m.mousedown=m[S],m.mousemove=m[E],m.mouseup=m[I]),O||(a.allowPanToNext=!1)}}});var qt,Yt,Bt,Xt,Zt,Ut,Gt,Qt=function(t,n,i,s){qt&&clearTimeout(qt),Xt=!0,Bt=!0;var l;t.initialLayout?(l=t.initialLayout,t.initialLayout=null):l=a.getThumbBoundsFn&&a.getThumbBoundsFn(c);var d=i?a.hideAnimationDuration:a.showAnimationDuration,p=function(){Qe("initialZoom"),i?(r.template.removeAttribute("style"),r.bg.removeAttribute("style")):(ke(1),n&&(n.style.display="block"),o.addClass(e,"pswp--animated-in"),Ie("initialZoom"+(i?"OutEnd":"InEnd"))),s&&s(),Xt=!1};if(!d||!l||void 0===l.x)return Ie("initialZoom"+(i?"Out":"In")),v=t.initialZoomLevel,Ve(pe,t.initialPosition),Oe(),e.style.opacity=i?0:1,ke(1),void(d?setTimeout(function(){p()},d):p());!function(){var n=u,s=!r.currItem.src||r.currItem.loadError||a.showHideOpacity;t.miniImg&&(t.miniImg.style.webkitBackfaceVisibility="hidden"),i||(v=l.w/t.w,pe.x=l.x,pe.y=l.y-L,r[s?"template":"bg"].style.opacity=.001,Oe()),Ke("initialZoom"),i&&!n&&o.removeClass(e,"pswp--animated-in"),s&&(i?o[(n?"remove":"add")+"Class"](e,"pswp--animate_opacity"):setTimeout(function(){o.addClass(e,"pswp--animate_opacity")},30)),qt=setTimeout(function(){if(Ie("initialZoom"+(i?"Out":"In")),i){var r=l.w/t.w,a={x:pe.x,y:pe.y},u=v,c=ae,f=function(t){1===t?(v=r,pe.x=l.x,pe.y=l.y-N):(v=(r-u)*t+u,pe.x=(l.x-a.x)*t+a.x,pe.y=(l.y-N-a.y)*t+a.y),Oe(),s?e.style.opacity=1-t:ke(c-t*c)};n?et("initialZoom",0,1,d,o.easing.cubic.out,f,p):(f(1),qt=setTimeout(p,d+20))}else v=t.initialZoomLevel,Ve(pe,t.initialPosition),Oe(),ke(1),s?e.style.opacity=1:ke(1),qt=setTimeout(p,d+20)},i?25:90)}()},Kt={},Jt=[],en={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return Yt.length}},tn=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},nn=function(e,t,n){var i=e.bounds;i.center.x=Math.round((Kt.x-t)/2),i.center.y=Math.round((Kt.y-n)/2)+e.vGap.top,i.max.x=t>Kt.x?Math.round(Kt.x-t):i.center.x,i.max.y=n>Kt.y?Math.round(Kt.y-n)+e.vGap.top:i.center.y,i.min.x=t>Kt.x?0:i.center.x,i.min.y=n>Kt.y?e.vGap.top:i.center.y},on=function(e,t,n){if(e.src&&!e.loadError){var i=!n;if(i&&(e.vGap||(e.vGap={top:0,bottom:0}),Ie("parseVerticalMargin",e)),Kt.x=t.x,Kt.y=t.y-e.vGap.top-e.vGap.bottom,i){var o=Kt.x/e.w,r=Kt.y/e.h;e.fitRatio=r>o?o:r;var s=a.scaleMode;"orig"===s?n=1:"fit"===s&&(n=e.fitRatio),n>1&&(n=1),e.initialZoomLevel=n,e.bounds||(e.bounds=tn())}if(!n)return;return nn(e,e.w*n,e.h*n),i&&n===e.initialZoomLevel&&(e.initialPosition=e.bounds.center),e.bounds}return e.w=e.h=0,e.initialZoomLevel=e.fitRatio=1,e.bounds=tn(),e.initialPosition=e.bounds.center,e.bounds},rn=function(e,t,n,i,o,a){t.loadError||i&&(t.imageAppended=!0,ln(t,i,t===r.currItem&&xe),n.appendChild(i),a&&setTimeout(function(){t&&t.loaded&&t.placeholder&&(t.placeholder.style.display="none",t.placeholder=null)},500))},an=function(e){e.loading=!0,e.loaded=!1;var t=e.img=o.createEl("pswp__img","img"),n=function(){e.loading=!1,e.loaded=!0,e.loadComplete?e.loadComplete(e):e.img=null,t.onload=t.onerror=null,t=null};return t.onload=n,t.onerror=function(){e.loadError=!0,n()},t.src=e.src,t},sn=function(e,t){return e.src&&e.loadError&&e.container?(t&&(e.container.innerHTML=""),e.container.innerHTML=a.errorMsg.replace("%url%",e.src),!0):void 0},ln=function(e,t,n){if(e.src){t||(t=e.container.lastChild);var i=n?e.w:Math.round(e.w*e.fitRatio),o=n?e.h:Math.round(e.h*e.fitRatio);e.placeholder&&!e.loaded&&(e.placeholder.style.width=i+"px",e.placeholder.style.height=o+"px"),t.style.width=i+"px",t.style.height=o+"px"}},un=function(){if(Jt.length){for(var e,t=0;t<Jt.length;t++)e=Jt[t],e.holder.index===e.index&&rn(e.index,e.item,e.baseDiv,e.img,0,e.clearPlaceholder);Jt=[]}};Ce("Controller",{publicMethods:{lazyLoadItem:function(e){e=Te(e);var t=Zt(e);t&&(!t.loaded&&!t.loading||x)&&(Ie("gettingData",e,t),t.src&&an(t))},initController:function(){o.extend(a,en,!0),r.items=Yt=n,Zt=r.getItemAt,Ut=a.getNumItemsFn,Gt=a.loop,Ut()<3&&(a.loop=!1),Ee("beforeChange",function(e){var t,n=a.preload,i=null===e||e>=0,o=Math.min(n[0],Ut()),s=Math.min(n[1],Ut());for(t=1;(i?s:o)>=t;t++)r.lazyLoadItem(c+t);for(t=1;(i?o:s)>=t;t++)r.lazyLoadItem(c-t)}),Ee("initialLayout",function(){r.currItem.initialLayout=a.getThumbBoundsFn&&a.getThumbBoundsFn(c)}),Ee("mainScrollAnimComplete",un),Ee("initialZoomInEnd",un),Ee("destroy",function(){for(var e,t=0;t<Yt.length;t++)e=Yt[t],e.container&&(e.container=null),e.placeholder&&(e.placeholder=null),e.img&&(e.img=null),e.preloader&&(e.preloader=null),e.loadError&&(e.loaded=e.loadError=!1);Jt=null})},getItemAt:function(e){return e>=0&&void 0!==Yt[e]&&Yt[e]},allowProgressiveImg:function(){return a.forceProgressiveLoading||!O||a.mouseUsed||screen.width>1200},setContent:function(e,t){a.loop&&(t=Te(t));var n=r.getItemAt(e.index);n&&(n.container=null);var i,l=r.getItemAt(t);if(!l)return void(e.el.innerHTML="");Ie("gettingData",t,l),e.index=t,e.item=l;var u=l.container=o.createEl("pswp__zoom-wrap");if(!l.src&&l.html&&(l.html.tagName?u.appendChild(l.html):u.innerHTML=l.html),sn(l),on(l,fe),!l.src||l.loadError||l.loaded)l.src&&!l.loadError&&(i=o.createEl("pswp__img","img"),i.style.opacity=1,i.src=l.src,ln(l,i),rn(0,l,u,i));else{if(l.loadComplete=function(n){if(s){if(e&&e.index===t){if(sn(n,!0))return n.loadComplete=n.img=null,on(n,fe),Me(n),void(e.index===c&&r.updateCurrZoomItem());n.imageAppended?!Xt&&n.placeholder&&(n.placeholder.style.display="none",n.placeholder=null):R.transform&&(ne||Xt)?Jt.push({item:n,baseDiv:u,img:n.img,index:t,holder:e,clearPlaceholder:!0}):rn(0,n,u,n.img,0,!0)}n.loadComplete=null,n.img=null,Ie("imageLoadComplete",t,n)}},o.features.transform){var d="pswp__img pswp__img--placeholder";d+=l.msrc?"":" pswp__img--placeholder--blank";var p=o.createEl(d,l.msrc?"img":"");l.msrc&&(p.src=l.msrc),ln(l,p),u.appendChild(p),l.placeholder=p}l.loading||an(l),r.allowProgressiveImg()&&(!Bt&&R.transform?Jt.push({item:l,baseDiv:u,img:l.img,index:t,holder:e}):rn(0,l,u,l.img,0,!0))}Bt||t!==c?Me(l):(te=u.style,Qt(l,i||l.img)),e.el.innerHTML="",e.el.appendChild(u)},cleanSlide:function(e){e.img&&(e.img.onload=e.img.onerror=null),e.loaded=e.loading=e.img=e.imageAppended=!1}}});var cn,dn={},pn=function(e,t,n){var i=document.createEvent("CustomEvent"),o={origEvent:e,target:e.target,releasePoint:t,pointerType:n||"touch"};i.initCustomEvent("pswpTap",!0,!0,o),e.target.dispatchEvent(i)};Ce("Tap",{publicMethods:{initTap:function(){Ee("firstTouchStart",r.onTapStart),Ee("touchRelease",r.onTapRelease),Ee("destroy",function(){dn={},cn=null})},onTapStart:function(e){e.length>1&&(clearTimeout(cn),cn=null)},onTapRelease:function(e,t){if(t&&!X&&!Y&&!Ge){var n=t;if(cn&&(clearTimeout(cn),cn=null,yt(n,dn)))return void Ie("doubleTap",n);if("mouse"===t.type)return void pn(e,t,"mouse");if("BUTTON"===e.target.tagName.toUpperCase()||o.hasClass(e.target,"pswp__single-tap"))return void pn(e,t);Ve(dn,n),cn=setTimeout(function(){pn(e,t),cn=null},300)}}}});var fn;Ce("DesktopZoom",{publicMethods:{initDesktopZoom:function(){V||(O?Ee("mouseUsed",function(){r.setupDesktopZoom()}):r.setupDesktopZoom(!0))},setupDesktopZoom:function(t){fn={};var n="wheel mousewheel DOMMouseScroll";Ee("bindEvents",function(){o.bind(e,n,r.handleMouseWheel)}),Ee("unbindEvents",function(){fn&&o.unbind(e,n,r.handleMouseWheel)}),r.mouseZoomedIn=!1;var i,a=function(){r.mouseZoomedIn&&(o.removeClass(e,"pswp--zoomed-in"),r.mouseZoomedIn=!1),1>v?o.addClass(e,"pswp--zoom-allowed"):o.removeClass(e,"pswp--zoom-allowed"),s()},s=function(){i&&(o.removeClass(e,"pswp--dragging"),i=!1)};Ee("resize",a),Ee("afterChange",a),Ee("pointerDown",function(){r.mouseZoomedIn&&(i=!0,o.addClass(e,"pswp--dragging"))}),Ee("pointerUp",s),t||a()},handleMouseWheel:function(e){if(v<=r.currItem.fitRatio)return a.modal&&(!a.closeOnScroll||Ge||q?e.preventDefault():k&&Math.abs(e.deltaY)>2&&(u=!0,r.close())),!0;if(e.stopPropagation(),fn.x=0,"deltaX"in e)1===e.deltaMode?(fn.x=18*e.deltaX,fn.y=18*e.deltaY):(fn.x=e.deltaX,fn.y=e.deltaY);else if("wheelDelta"in e)e.wheelDeltaX&&(fn.x=-.16*e.wheelDeltaX),e.wheelDeltaY?fn.y=-.16*e.wheelDeltaY:fn.y=-.16*e.wheelDelta;else{if(!("detail"in e))return;fn.y=e.detail}je(v,!0);var t=pe.x-fn.x,n=pe.y-fn.y;(a.modal||t<=ee.min.x&&t>=ee.max.x&&n<=ee.min.y&&n>=ee.max.y)&&e.preventDefault(),r.panTo(t,n)},toggleDesktopZoom:function(t){t=t||{x:fe.x/2+me.x,y:fe.y/2+me.y};var n=a.getDoubleTapZoom(!0,r.currItem),i=v===n;r.mouseZoomedIn=!i,r.zoomTo(i?r.currItem.initialZoomLevel:n,t,333),o[(i?"remove":"add")+"Class"](e,"pswp--zoomed-in")}}});var hn,mn,vn,gn,yn,bn,wn,xn,Cn,Tn,Sn,En,In={history:!0,galleryUID:1},Pn=function(){return Sn.hash.substring(1)},kn=function(){hn&&clearTimeout(hn),vn&&clearTimeout(vn)},An=function(){var e=Pn(),t={};if(e.length<5)return t;var n,i=e.split("&");for(n=0;n<i.length;n++)if(i[n]){var o=i[n].split("=");o.length<2||(t[o[0]]=o[1])}if(a.galleryPIDs){var r=t.pid;for(t.pid=0,n=0;n<Yt.length;n++)if(Yt[n].pid===r){t.pid=n;break}}else t.pid=parseInt(t.pid,10)-1;return t.pid<0&&(t.pid=0),t},On=function(){if(vn&&clearTimeout(vn),Ge||q)return void(vn=setTimeout(On,500));gn?clearTimeout(mn):gn=!0;var e=c+1,t=Zt(c);t.hasOwnProperty("pid")&&(e=t.pid);var n=wn+"&gid="+a.galleryUID+"&pid="+e;xn||-1===Sn.hash.indexOf(n)&&(Tn=!0);var i=Sn.href.split("#")[0]+"#"+n;En?"#"+n!==window.location.hash&&history[xn?"replaceState":"pushState"]("",document.title,i):xn?Sn.replace(i):Sn.hash=n,xn=!0,mn=setTimeout(function(){gn=!1},60)};Ce("History",{publicMethods:{initHistory:function(){if(o.extend(a,In,!0),a.history){Sn=window.location,Tn=!1,Cn=!1,xn=!1,wn=Pn(),En="pushState"in history,wn.indexOf("gid=")>-1&&(wn=wn.split("&gid=")[0],wn=wn.split("?gid=")[0]),Ee("afterChange",r.updateURL),Ee("unbindEvents",function(){o.unbind(window,"hashchange",r.onHashChange)});var e=function(){bn=!0,Cn||(Tn?history.back():wn?Sn.hash=wn:En?history.pushState("",document.title,Sn.pathname+Sn.search):Sn.hash=""),kn()};Ee("unbindEvents",function(){u&&e()}),Ee("destroy",function(){bn||e()}),Ee("firstUpdate",function(){c=An().pid});var t=wn.indexOf("pid=");t>-1&&(wn=wn.substring(0,t),"&"===wn.slice(-1)&&(wn=wn.slice(0,-1))),setTimeout(function(){s&&o.bind(window,"hashchange",r.onHashChange)},40)}},onHashChange:function(){return Pn()===wn?(Cn=!0,void r.close()):void(gn||(yn=!0,r.goTo(An().pid),yn=!1))},updateURL:function(){kn(),yn||(xn?hn=setTimeout(On,800):On())}}}),o.extend(r,tt)}}),function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.PhotoSwipeUI_Default=t()}(this,function(){"use strict";return function(e,t){var n,i,o,r,a,s,l,u,c,d,p,f,h,m,v,g,y,b,w,x=this,C=!1,T=!0,S=!0,E={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(e,t){return e.title?(t.children[0].innerHTML=e.title,!0):(t.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return e.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return e.currItem.title||""},indexIndicatorSep:" / ",fitControlsWidth:1200},I=function(e){if(g)return!0;e=e||window.event,v.timeToIdle&&v.mouseUsed&&!c&&N();for(var n,i,o=e.target||e.srcElement,r=o.getAttribute("class")||"",a=0;a<q.length;a++)n=q[a],n.onTap&&r.indexOf("pswp__"+n.name)>-1&&(n.onTap(),i=!0);if(i){e.stopPropagation&&e.stopPropagation(),g=!0;var s=t.features.isOldAndroid?600:30;y=setTimeout(function(){g=!1},s)}},P=function(){return!e.likelyTouchDevice||v.mouseUsed||screen.width>v.fitControlsWidth},k=function(e,n,i){t[(i?"add":"remove")+"Class"](e,"pswp__"+n)},A=function(){var e=1===v.getNumItemsFn();e!==m&&(k(i,"ui--one-slide",e),m=e)},O=function(){k(l,"share-modal--hidden",S)},M=function(){return S=!S,S?(t.removeClass(l,"pswp__share-modal--fade-in"),setTimeout(function(){S&&O()},300)):(O(),setTimeout(function(){S||t.addClass(l,"pswp__share-modal--fade-in")},30)),S||F(),!1},D=function(t){t=t||window.event;var n=t.target||t.srcElement;return e.shout("shareLinkClick",t,n),!!n.href&&(!!n.hasAttribute("download")||(window.open(n.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),S||M(),!1))},F=function(){for(var e,t,n,i,o,r="",a=0;a<v.shareButtons.length;a++)e=v.shareButtons[a],n=v.getImageURLForShare(e),i=v.getPageURLForShare(e),o=v.getTextForShare(e),t=e.url.replace("{{url}}",encodeURIComponent(i)).replace("{{image_url}}",encodeURIComponent(n)).replace("{{raw_image_url}}",n).replace("{{text}}",encodeURIComponent(o)),r+='<a href="'+t+'" target="_blank" class="pswp__share--'+e.id+'"'+(e.download?"download":"")+">"+e.label+"</a>",v.parseShareButtonOut&&(r=v.parseShareButtonOut(e,r));l.children[0].innerHTML=r,l.children[0].onclick=D},L=function(e){for(var n=0;n<v.closeElClasses.length;n++)if(t.hasClass(e,"pswp__"+v.closeElClasses[n]))return!0},V=0,N=function(){clearTimeout(w),V=0,c&&x.setIdle(!1)},R=function(e){e=e?e:window.event;var t=e.relatedTarget||e.toElement;t&&"HTML"!==t.nodeName||(clearTimeout(w),w=setTimeout(function(){x.setIdle(!0)},v.timeToIdleOutside))},_=function(){v.fullscreenEl&&!t.features.isOldAndroid&&(n||(n=x.getFullscreenAPI()),n?(t.bind(document,n.eventK,x.updateFullscreen),x.updateFullscreen(),t.addClass(e.template,"pswp--supports-fs")):t.removeClass(e.template,"pswp--supports-fs"))},z=function(){v.preloaderEl&&(H(!0),d("beforeChange",function(){clearTimeout(h),h=setTimeout(function(){e.currItem&&e.currItem.loading?(!e.allowProgressiveImg()||e.currItem.img&&!e.currItem.img.naturalWidth)&&H(!1):H(!0)},v.loadingIndicatorDelay)}),d("imageLoadComplete",function(t,n){e.currItem===n&&H(!0)}))},H=function(e){f!==e&&(k(p,"preloader--active",!e),f=e)},j=function(e){var n=e.vGap;if(P()){var a=v.barsSize;if(v.captionEl&&"auto"===a.bottom)if(r||(r=t.createEl("pswp__caption pswp__caption--fake"),r.appendChild(t.createEl("pswp__caption__center")),i.insertBefore(r,o),t.addClass(i,"pswp__ui--fit")),v.addCaptionHTMLFn(e,r,!0)){var s=r.clientHeight;n.bottom=parseInt(s,10)||44}else n.bottom=a.top;else n.bottom="auto"===a.bottom?0:a.bottom;n.top=a.top}else n.top=n.bottom=0},$=function(){v.timeToIdle&&d("mouseUsed",function(){t.bind(document,"mousemove",N),t.bind(document,"mouseout",R),b=setInterval(function(){2===++V&&x.setIdle(!0)},v.timeToIdle/2)})},W=function(){d("onVerticalDrag",function(e){T&&.95>e?x.hideControls():!T&&e>=.95&&x.showControls()});var e;d("onPinchClose",function(t){T&&.9>t?(x.hideControls(),e=!0):e&&!T&&t>.9&&x.showControls()}),d("zoomGestureEnded",function(){(e=!1)&&!T&&x.showControls()})},q=[{name:"caption",option:"captionEl",onInit:function(e){o=e}},{name:"share-modal",option:"shareEl",onInit:function(e){l=e},onTap:function(){M()}},{name:"button--share",option:"shareEl",onInit:function(e){s=e},onTap:function(){M()}},{
name:"button--zoom",option:"zoomEl",onTap:e.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(e){a=e}},{name:"button--close",option:"closeEl",onTap:e.close},{name:"button--arrow--left",option:"arrowEl",onTap:e.prev},{name:"button--arrow--right",option:"arrowEl",onTap:e.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){n.isFullscreen()?n.exit():n.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(e){p=e}}],Y=function(){var e,n,o,r=function(i){if(i)for(var r=i.length,a=0;r>a;a++){e=i[a],n=e.className;for(var s=0;s<q.length;s++)o=q[s],n.indexOf("pswp__"+o.name)>-1&&(v[o.option]?(t.removeClass(e,"pswp__element--disabled"),o.onInit&&o.onInit(e)):t.addClass(e,"pswp__element--disabled"))}};r(i.children);var a=t.getChildByClass(i,"pswp__top-bar");a&&r(a.children)};x.init=function(){t.extend(e.options,E,!0),v=e.options,i=t.getChildByClass(e.scrollWrap,"pswp__ui"),d=e.listen,W(),d("beforeChange",x.update),d("doubleTap",function(t){var n=e.currItem.initialZoomLevel;e.getZoomLevel()!==n?e.zoomTo(n,t,333):e.zoomTo(v.getDoubleTapZoom(!1,e.currItem),t,333)}),d("preventDragEvent",function(e,t,n){var i=e.target||e.srcElement;i&&i.getAttribute("class")&&e.type.indexOf("mouse")>-1&&(i.getAttribute("class").indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(i.tagName))&&(n.prevent=!1)}),d("bindEvents",function(){t.bind(i,"pswpTap click",I),t.bind(e.scrollWrap,"pswpTap",x.onGlobalTap),e.likelyTouchDevice||t.bind(e.scrollWrap,"mouseover",x.onMouseOver)}),d("unbindEvents",function(){S||M(),b&&clearInterval(b),t.unbind(document,"mouseout",R),t.unbind(document,"mousemove",N),t.unbind(i,"pswpTap click",I),t.unbind(e.scrollWrap,"pswpTap",x.onGlobalTap),t.unbind(e.scrollWrap,"mouseover",x.onMouseOver),n&&(t.unbind(document,n.eventK,x.updateFullscreen),n.isFullscreen()&&(v.hideAnimationDuration=0,n.exit()),n=null)}),d("destroy",function(){v.captionEl&&(r&&i.removeChild(r),t.removeClass(o,"pswp__caption--empty")),l&&(l.children[0].onclick=null),t.removeClass(i,"pswp__ui--over-close"),t.addClass(i,"pswp__ui--hidden"),x.setIdle(!1)}),v.showAnimationDuration||t.removeClass(i,"pswp__ui--hidden"),d("initialZoomIn",function(){v.showAnimationDuration&&t.removeClass(i,"pswp__ui--hidden")}),d("initialZoomOut",function(){t.addClass(i,"pswp__ui--hidden")}),d("parseVerticalMargin",j),Y(),v.shareEl&&s&&l&&(S=!0),A(),$(),_(),z()},x.setIdle=function(e){c=e,k(i,"ui--idle",e)},x.update=function(){T&&e.currItem?(x.updateIndexIndicator(),v.captionEl&&(v.addCaptionHTMLFn(e.currItem,o),k(o,"caption--empty",!e.currItem.title)),C=!0):C=!1,S||M(),A()},x.updateFullscreen=function(i){i&&setTimeout(function(){e.setScrollOffset(0,t.getScrollY())},50),t[(n.isFullscreen()?"add":"remove")+"Class"](e.template,"pswp--fs")},x.updateIndexIndicator=function(){v.counterEl&&(a.innerHTML=e.getCurrentIndex()+1+v.indexIndicatorSep+v.getNumItemsFn())},x.onGlobalTap=function(n){n=n||window.event;var i=n.target||n.srcElement;if(!g)if(n.detail&&"mouse"===n.detail.pointerType){if(L(i))return void e.close();t.hasClass(i,"pswp__img")&&(1===e.getZoomLevel()&&e.getZoomLevel()<=e.currItem.fitRatio?v.clickToCloseNonZoomable&&e.close():e.toggleDesktopZoom(n.detail.releasePoint))}else if(v.tapToToggleControls&&(T?x.hideControls():x.showControls()),v.tapToClose&&(t.hasClass(i,"pswp__img")||L(i)))return void e.close()},x.onMouseOver=function(e){e=e||window.event,k(i,"ui--over-close",L(e.target||e.srcElement))},x.hideControls=function(){t.addClass(i,"pswp__ui--hidden"),T=!1},x.showControls=function(){T=!0,C||x.update(),t.removeClass(i,"pswp__ui--hidden")},x.supportsFullscreen=function(){var e=document;return!!(e.exitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen||e.msExitFullscreen)},x.getFullscreenAPI=function(){var t,n=document.documentElement,i="fullscreenchange";return n.requestFullscreen?t={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:i}:n.mozRequestFullScreen?t={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+i}:n.webkitRequestFullscreen?t={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+i}:n.msRequestFullscreen&&(t={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),t&&(t.enter=function(){return u=v.closeOnScroll,v.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?e.template[this.enterK]():void e.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},t.exit=function(){return v.closeOnScroll=u,document[this.exitK]()},t.isFullscreen=function(){return document[this.elementK]}),t}}});var initPhotoSwipeFromDOM=function(e){for(var t=function(e){for(var t,n,i,o,r=e.childNodes,a=r.length,s=[],l=0;l<a;l++)t=r[l],1===t.nodeType&&(n=t.children[0],i=n.getAttribute("data-size").split("x"),o={src:n.getAttribute("href"),w:parseInt(i[0],10),h:parseInt(i[1],10)},t.children.length>1&&(o.title=t.children[1].innerHTML),n.children.length>0&&(o.msrc=n.children[0].getAttribute("src")),o.el=t,s.push(o));return s},n=function e(t,n){return t&&(n(t)?t:e(t.parentNode,n))},i=function(e){e=e||window.event,e.preventDefault?e.preventDefault():e.returnValue=!1;var t=e.target||e.srcElement,i=n(t,function(e){return e.tagName&&"FIGURE"===e.tagName.toUpperCase()});if(i){for(var r,a=i.parentNode,s=i.parentNode.childNodes,l=s.length,u=0,c=0;c<l;c++)if(1===s[c].nodeType){if(s[c]===i){r=u;break}u++}return r>=0&&o(r,a),!1}},o=function(e,n,i,o){var r,a,s,l=document.querySelectorAll(".pswp")[0];if(s=t(n),a={galleryUID:n.getAttribute("data-pswp-uid"),getThumbBoundsFn:function(e){var t=s[e].el.getElementsByTagName("img")[0],n=window.pageYOffset||document.documentElement.scrollTop,i=t.getBoundingClientRect();return{x:i.left,y:i.top+n,w:i.width}}},o)if(a.galleryPIDs){for(var u=0;u<s.length;u++)if(s[u].pid==e){a.index=u;break}}else a.index=parseInt(e,10)-1;else a.index=parseInt(e,10);isNaN(a.index)||(i&&(a.showAnimationDuration=0),r=new PhotoSwipe(l,PhotoSwipeUI_Default,s,a),r.init())},r=document.querySelectorAll(e),a=0,s=r.length;a<s;a++)r[a].setAttribute("data-pswp-uid",a+1),r[a].onclick=i;var l=function(){var e=window.location.hash.substring(1),t={};if(e.length<5)return t;for(var n=e.split("&"),i=0;i<n.length;i++)if(n[i]){var o=n[i].split("=");o.length<2||(t[o[0]]=o[1])}return t.gid&&(t.gid=parseInt(t.gid,10)),t}();l.pid&&l.gid&&o(l.pid,r[l.gid-1],!0,!0)};initPhotoSwipeFromDOM(".mdb-lightbox"),$(function(){$(".arrow-r").on("click",function(){$(".arrow-r").not(this).find(".fa-angle-down").removeClass("rotate-element"),$(this).find(".fa-angle-down").toggleClass("rotate-element")})}),$("body").on("shown.bs.modal",".modal",function(){$(".modal-backdrop").length||($modal_dialog=$(this).children(".modal-dialog"),$modal_dialog.hasClass("modal-side")&&($(this).addClass("modal-scrolling"),$("body").addClass("scrollable")),$modal_dialog.hasClass("modal-frame")&&($(this).addClass("modal-content-clickable"),$("body").addClass("scrollable")))}),$("body").on("hidden.bs.modal",".modal",function(){$("body").removeClass("scrollable")});

var _Mathfloor=Math.floor,_Mathmin=Math.min,_Mathround=Math.round,_Mathmax=Math.max;const nativeHints=['native code','[object MutationObserverConstructor]'];var isNative=(e)=>nativeHints.some((t)=>-1<(e||'').toString().indexOf(t));const isBrowser='undefined'!=typeof window,longerTimeoutBrowsers=['Edge','Trident','Firefox'];let timeoutDuration=0;for(let e=0;e<longerTimeoutBrowsers.length;e+=1)if(isBrowser&&0<=navigator.userAgent.indexOf(longerTimeoutBrowsers[e])){timeoutDuration=1;break}function microtaskDebounce(e){let t=!1,o=0;const r=document.createElement('span'),p=new MutationObserver(()=>{e(),t=!1});return p.observe(r,{attributes:!0}),()=>{t||(t=!0,r.setAttribute('x-index',o),++o)}}function taskDebounce(e){let t=!1;return()=>{t||(t=!0,setTimeout(()=>{t=!1,e()},timeoutDuration))}}const supportsNativeMutationObserver=isBrowser&&isNative(window.MutationObserver);var debounce=supportsNativeMutationObserver?microtaskDebounce:taskDebounce;function isNumeric(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function setStyles(e,t){Object.keys(t).forEach((o)=>{let r='';-1!==['width','height','top','right','bottom','left'].indexOf(o)&&isNumeric(t[o])&&(r='px'),e.style[o]=t[o]+r})}function isFunction(e){return e&&'[object Function]'==={}.toString.call(e)}function getStyleComputedProperty(e,t){if(1!==e.nodeType)return[];const o=window.getComputedStyle(e,null);return t?o[t]:o}function getParentNode(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function getScrollParent(e){if(!e||-1!==['HTML','BODY','#document'].indexOf(e.nodeName))return window.document.body;const{overflow:t,overflowX:o,overflowY:r}=getStyleComputedProperty(e);return /(auto|scroll)/.test(t+r+o)?e:getScrollParent(getParentNode(e))}function isOffsetContainer(e){const{nodeName:t}=e;return'BODY'!==t&&('HTML'===t||e.firstElementChild.offsetParent===e)}function getRoot(e){return null===e.parentNode?e:getRoot(e.parentNode)}function getOffsetParent(e){const t=e&&e.offsetParent,o=t&&t.nodeName;return o&&'BODY'!==o&&'HTML'!==o?t:window.document.documentElement}function findCommonOffsetParent(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return window.document.documentElement;const o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,r=o?e:t,p=o?t:e,s=document.createRange();s.setStart(r,0),s.setEnd(p,0);const{commonAncestorContainer:d}=s;if(e!==d&&t!==d||r.contains(p))return isOffsetContainer(d)?d:getOffsetParent(d);const f=getRoot(e);return f.host?findCommonOffsetParent(f.host,t):findCommonOffsetParent(e,getRoot(t).host)}function getScroll(e,t='top'){const o='top'===t?'scrollTop':'scrollLeft',r=e.nodeName;if('BODY'===r||'HTML'===r){const p=window.document.documentElement,s=window.document.scrollingElement||p;return s[o]}return e[o]}function includeScroll(e,t,o=!1){const r=getScroll(t,'top'),p=getScroll(t,'left'),s=o?-1:1;return e.top+=r*s,e.bottom+=r*s,e.left+=p*s,e.right+=p*s,e}function getBordersSize(e,t){const o='x'===t?'Left':'Top',r='Left'==o?'Right':'Bottom';return+e[`border${o}Width`].split('px')[0]+ +e[`border${r}Width`].split('px')[0]}let isIE10;var isIE10$1=function(){return void 0==isIE10&&(isIE10=-1!==navigator.appVersion.indexOf('MSIE 10')),isIE10};function getSize(e,t,o,r){return _Mathmax(t[`offset${e}`],o[`client${e}`],o[`offset${e}`],isIE10$1()?o[`offset${e}`]+r[`margin${'Height'===e?'Top':'Left'}`]+r[`margin${'Height'===e?'Bottom':'Right'}`]:0)}function getWindowSizes(){const e=window.document.body,t=window.document.documentElement,o=isIE10$1()&&window.getComputedStyle(t);return{height:getSize('Height',e,t,o),width:getSize('Width',e,t,o)}}var _extends=Object.assign||function(e){for(var o,t=1;t<arguments.length;t++)for(var r in o=arguments[t],o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);return e};function getClientRect(e){return _extends({},e,{right:e.left+e.width,bottom:e.top+e.height})}function getBoundingClientRect(e){let t={};if(isIE10$1())try{t=e.getBoundingClientRect();const l=getScroll(e,'top'),m=getScroll(e,'left');t.top+=l,t.left+=m,t.bottom+=l,t.right+=m}catch(l){}else t=e.getBoundingClientRect();const o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},r='HTML'===e.nodeName?getWindowSizes():{},p=r.width||e.clientWidth||o.right-o.left,s=r.height||e.clientHeight||o.bottom-o.top;let d=e.offsetWidth-p,f=e.offsetHeight-s;if(d||f){const l=getStyleComputedProperty(e);d-=getBordersSize(l,'x'),f-=getBordersSize(l,'y'),o.width-=d,o.height-=f}return getClientRect(o)}function getOffsetRectRelativeToArbitraryNode(e,t){const o=isIE10$1(),r='HTML'===t.nodeName,p=getBoundingClientRect(e),s=getBoundingClientRect(t),d=getScrollParent(e);let f=getClientRect({top:p.top-s.top,left:p.left-s.left,width:p.width,height:p.height});if(r||'BODY'===t.nodeName){const l=getStyleComputedProperty(t),m=o&&r?0:+l.borderTopWidth.split('px')[0],h=o&&r?0:+l.borderLeftWidth.split('px')[0],c=o&&r?0:+l.marginTop.split('px')[0],u=o&&r?0:+l.marginLeft.split('px')[0];f.top-=m-c,f.bottom-=m-c,f.left-=h-u,f.right-=h-u,f.marginTop=c,f.marginLeft=u}return(o?t.contains(d):t===d&&'BODY'!==d.nodeName)&&(f=includeScroll(f,t)),f}function getViewportOffsetRectRelativeToArtbitraryNode(e){const t=window.document.documentElement,o=getOffsetRectRelativeToArbitraryNode(e,t),r=_Mathmax(t.clientWidth,window.innerWidth||0),p=_Mathmax(t.clientHeight,window.innerHeight||0),s=getScroll(t),d=getScroll(t,'left'),f={top:s-o.top+o.marginTop,left:d-o.left+o.marginLeft,width:r,height:p};return getClientRect(f)}function isFixed(e){const t=e.nodeName;return'BODY'===t||'HTML'===t?!1:!('fixed'!==getStyleComputedProperty(e,'position'))||isFixed(getParentNode(e))}function getBoundaries(e,t,o,r){let p={top:0,left:0};const s=findCommonOffsetParent(e,t);if('viewport'===r)p=getViewportOffsetRectRelativeToArtbitraryNode(s);else{let d;'scrollParent'===r?(d=getScrollParent(getParentNode(e)),'BODY'===d.nodeName&&(d=window.document.documentElement)):'window'===r?d=window.document.documentElement:d=r;const f=getOffsetRectRelativeToArbitraryNode(d,s);if('HTML'===d.nodeName&&!isFixed(s)){const{height:l,width:m}=getWindowSizes();p.top+=f.top-f.marginTop,p.bottom=l+f.top,p.left+=f.left-f.marginLeft,p.right=m+f.left}else p=f}return p.left+=o,p.top+=o,p.right-=o,p.bottom-=o,p}function getArea({width:e,height:t}){return e*t}function computeAutoPlacement(e,t,o,r,p,s=0){if(-1===e.indexOf('auto'))return e;const d=getBoundaries(o,r,s,p),f={top:{width:d.width,height:t.top-d.top},right:{width:d.right-t.right,height:d.height},bottom:{width:d.width,height:d.bottom-t.bottom},left:{width:t.left-d.left,height:d.height}},l=Object.keys(f).map((u)=>_extends({key:u},f[u],{area:getArea(f[u])})).sort((u,g)=>g.area-u.area),m=l.filter(({width:u,height:g})=>u>=o.clientWidth&&g>=o.clientHeight),h=0<m.length?m[0].key:l[0].key,c=e.split('-')[1];return h+(c?`-${c}`:'')}function getReferenceOffsets(e,t,o){const r=findCommonOffsetParent(t,o);return getOffsetRectRelativeToArbitraryNode(o,r)}function getOuterSizes(e){const t=window.getComputedStyle(e),o=parseFloat(t.marginTop)+parseFloat(t.marginBottom),r=parseFloat(t.marginLeft)+parseFloat(t.marginRight),p={width:e.offsetWidth+r,height:e.offsetHeight+o};return p}function getOppositePlacement(e){const t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,(o)=>t[o])}function getPopperOffsets(e,t,o){o=o.split('-')[0];const r=getOuterSizes(e),p={width:r.width,height:r.height},s=-1!==['right','left'].indexOf(o),d=s?'top':'left',f=s?'left':'top',l=s?'height':'width',m=s?'width':'height';return p[d]=t[d]+t[l]/2-r[l]/2,p[f]=o===f?t[f]-r[m]:t[getOppositePlacement(f)],p}function find(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function findIndex(e,t,o){if(Array.prototype.findIndex)return e.findIndex((p)=>p[t]===o);const r=find(e,(p)=>p[t]===o);return e.indexOf(r)}function runModifiers(e,t,o){const r=void 0===o?e:e.slice(0,findIndex(e,'name',o));return r.forEach((p)=>{p.function&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');const s=p.function||p.fn;p.enabled&&isFunction(s)&&(t=s(t,p))}),t}function update(){if(this.state.isDestroyed)return;let e={instance:this,styles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=getReferenceOffsets(this.state,this.popper,this.reference),e.placement=computeAutoPlacement(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=getPopperOffsets(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position='absolute',e=runModifiers(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}function isModifierEnabled(e,t){return e.some(({name:o,enabled:r})=>r&&o===t)}function getSupportedPropertyName(e){const t=[!1,'ms','webkit','moz','o'],o=e.charAt(0).toUpperCase()+e.slice(1);for(let r=0;r<t.length-1;r++){const p=t[r],s=p?`${p}${o}`:e;if('undefined'!=typeof window.document.body.style[s])return s}return null}function destroy(){return this.state.isDestroyed=!0,isModifierEnabled(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.left='',this.popper.style.position='',this.popper.style.top='',this.popper.style[getSupportedPropertyName('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function attachToScrollParents(e,t,o,r){const p='BODY'===e.nodeName,s=p?window:e;s.addEventListener(t,o,{passive:!0}),p||attachToScrollParents(getScrollParent(s.parentNode),t,o,r),r.push(s)}function setupEventListeners(e,t,o,r){o.updateBound=r,window.addEventListener('resize',o.updateBound,{passive:!0});const p=getScrollParent(e);return attachToScrollParents(p,'scroll',o.updateBound,o.scrollParents),o.scrollElement=p,o.eventsEnabled=!0,o}function enableEventListeners(){this.state.eventsEnabled||(this.state=setupEventListeners(this.reference,this.options,this.state,this.scheduleUpdate))}function removeEventListeners(e,t){return window.removeEventListener('resize',t.updateBound),t.scrollParents.forEach((o)=>{o.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function disableEventListeners(){this.state.eventsEnabled&&(window.cancelAnimationFrame(this.scheduleUpdate),this.state=removeEventListeners(this.reference,this.state))}function setAttributes(e,t){Object.keys(t).forEach(function(o){const r=t[o];!1===r?e.removeAttribute(o):e.setAttribute(o,t[o])})}function applyStyle(e,t){const o={position:e.offsets.popper.position},r={'x-placement':e.placement},p=_Mathround(e.offsets.popper.left),s=_Mathround(e.offsets.popper.top),d=getSupportedPropertyName('transform');return t.gpuAcceleration&&d?(o[d]='translate3d('+p+'px, '+s+'px, 0)',o.top=0,o.left=0,o.willChange='transform'):(o.left=p,o.top=s,o.willChange='top, left'),setStyles(e.instance.popper,_extends({},o,e.styles)),setAttributes(e.instance.popper,_extends({},r,e.attributes)),e.offsets.arrow&&setStyles(e.arrowElement,e.offsets.arrow),e}function applyStyleOnLoad(e,t,o,r,p){const s=getReferenceOffsets(p,t,e),d=computeAutoPlacement(o.placement,s,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',d),o}function isModifierRequired(e,t,o){const r=find(e,({name:s})=>s===t),p=!!r&&e.some((s)=>{return s.name===o&&s.enabled&&s.order<r.order});if(!p){const s=`\`${t}\``,d=`\`${o}\``;console.warn(`${d} modifier is required by ${s} modifier in order to work, be sure to include it before ${s}!`)}return p}function arrow(e,t){if(!isModifierRequired(e.instance.modifiers,'arrow','keepTogether'))return e;let o=t.element;if('string'==typeof o){if(o=e.instance.popper.querySelector(o),!o)return e;}else if(!e.instance.popper.contains(o))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;const r=e.placement.split('-')[0],p=getClientRect(e.offsets.popper),s=e.offsets.reference,d=-1!==['left','right'].indexOf(r),f=d?'height':'width',l=d?'top':'left',m=d?'left':'top',h=d?'bottom':'right',c=getOuterSizes(o)[f];s[h]-c<p[l]&&(e.offsets.popper[l]-=p[l]-(s[h]-c)),s[l]+c>p[h]&&(e.offsets.popper[l]+=s[l]+c-p[h]);const u=s[l]+s[f]/2-c/2;let g=u-getClientRect(e.offsets.popper)[l];return g=_Mathmax(_Mathmin(p[f]-c,g),0),e.arrowElement=o,e.offsets.arrow={},e.offsets.arrow[l]=_Mathfloor(g),e.offsets.arrow[m]='',e}function getOppositeVariation(e){if('end'===e)return'start';return'start'===e?'end':e}var placements=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'];const validPlacements=placements.slice(3);function clockwise(e,t=!1){const o=validPlacements.indexOf(e),r=validPlacements.slice(o+1).concat(validPlacements.slice(0,o));return t?r.reverse():r}const BEHAVIORS={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'};function flip(e,t){if(isModifierEnabled(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;const o=getBoundaries(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement);let r=e.placement.split('-')[0],p=getOppositePlacement(r),s=e.placement.split('-')[1]||'',d=[];switch(t.behavior){case BEHAVIORS.FLIP:d=[r,p];break;case BEHAVIORS.CLOCKWISE:d=clockwise(r);break;case BEHAVIORS.COUNTERCLOCKWISE:d=clockwise(r,!0);break;default:d=t.behavior;}return d.forEach((f,l)=>{if(r!==f||d.length===l+1)return e;r=e.placement.split('-')[0],p=getOppositePlacement(r);const m=getClientRect(e.offsets.popper),h=e.offsets.reference,c=_Mathfloor,u='left'===r&&c(m.right)>c(h.left)||'right'===r&&c(m.left)<c(h.right)||'top'===r&&c(m.bottom)>c(h.top)||'bottom'===r&&c(m.top)<c(h.bottom),g=c(m.left)<c(o.left),w=c(m.right)>c(o.right),E=c(m.top)<c(o.top),O=c(m.bottom)>c(o.bottom),v='left'===r&&g||'right'===r&&w||'top'===r&&E||'bottom'===r&&O,L=-1!==['top','bottom'].indexOf(r),S=!!t.flipVariations&&(L&&'start'===s&&g||L&&'end'===s&&w||!L&&'start'===s&&E||!L&&'end'===s&&O);(u||v||S)&&(e.flipped=!0,(u||v)&&(r=d[l+1]),S&&(s=getOppositeVariation(s)),e.placement=r+(s?'-'+s:''),e.offsets.popper=_extends({},e.offsets.popper,getPopperOffsets(e.instance.popper,e.offsets.reference,e.placement)),e=runModifiers(e.instance.modifiers,e,'flip'))}),e}function keepTogether(e){const t=getClientRect(e.offsets.popper),o=e.offsets.reference,r=e.placement.split('-')[0],p=_Mathfloor,s=-1!==['top','bottom'].indexOf(r),d=s?'right':'bottom',f=s?'left':'top',l=s?'width':'height';return t[d]<p(o[f])&&(e.offsets.popper[f]=p(o[f])-t[l]),t[f]>p(o[d])&&(e.offsets.popper[f]=p(o[d])),e}function toValue(e,t,o,r){const p=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),s=+p[1],d=p[2];if(!s)return e;if(0===d.indexOf('%')){let f;switch(d){case'%p':f=o;break;case'%':case'%r':default:f=r;}const l=getClientRect(f);return l[t]/100*s}if('vh'===d||'vw'===d){let f;return f='vh'===d?_Mathmax(document.documentElement.clientHeight,window.innerHeight||0):_Mathmax(document.documentElement.clientWidth,window.innerWidth||0),f/100*s}return s}function parseOffset(e,t,o,r){const p=[0,0],s=-1!==['right','left'].indexOf(r),d=e.split(/(\+|\-)/).map((h)=>h.trim()),f=d.indexOf(find(d,(h)=>-1!==h.search(/,|\s/)));d[f]&&-1===d[f].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');const l=/\s*,\s*|\s+/;let m=-1===f?[d]:[d.slice(0,f).concat([d[f].split(l)[0]]),[d[f].split(l)[1]].concat(d.slice(f+1))];return m=m.map((h,c)=>{const u=(1===c?!s:s)?'height':'width';let g=!1;return h.reduce((w,E)=>{return''===w[w.length-1]&&-1!==['+','-'].indexOf(E)?(w[w.length-1]=E,g=!0,w):g?(w[w.length-1]+=E,g=!1,w):w.concat(E)},[]).map((w)=>toValue(w,u,t,o))}),m.forEach((h,c)=>{h.forEach((u,g)=>{isNumeric(u)&&(p[c]+=u*('-'===h[g-1]?-1:1))})}),p}function offset(e,{offset:t}){const{placement:o,offsets:{popper:r,reference:p}}=e,s=o.split('-')[0];let d;return d=isNumeric(+t)?[+t,0]:parseOffset(t,r,p,s),'left'===s?(r.top+=d[0],r.left-=d[1]):'right'===s?(r.top+=d[0],r.left+=d[1]):'top'===s?(r.left+=d[0],r.top-=d[1]):'bottom'===s&&(r.left+=d[0],r.top+=d[1]),e.popper=r,e}function preventOverflow(e,t){const o=t.boundariesElement||getOffsetParent(e.instance.popper),r=getBoundaries(e.instance.popper,e.instance.reference,t.padding,o);t.boundaries=r;const p=t.priority;let s=getClientRect(e.offsets.popper);const d={primary(f){let l=s[f];return s[f]<r[f]&&!t.escapeWithReference&&(l=_Mathmax(s[f],r[f])),{[f]:l}},secondary(f){const l='right'===f?'left':'top';let m=s[l];return s[f]>r[f]&&!t.escapeWithReference&&(m=_Mathmin(s[l],r[f]-('right'===f?s.width:s.height))),{[l]:m}}};return p.forEach((f)=>{const l=-1===['left','top'].indexOf(f)?'secondary':'primary';s=_extends({},s,d[l](f))}),e.offsets.popper=s,e}function shift(e){const t=e.placement,o=t.split('-')[0],r=t.split('-')[1];if(r){const p=e.offsets.reference,s=getClientRect(e.offsets.popper),d=-1!==['bottom','top'].indexOf(o),f=d?'left':'top',l=d?'width':'height',m={start:{[f]:p[f]},end:{[f]:p[f]+p[l]-s[l]}};e.offsets.popper=_extends({},s,m[r])}return e}function hide(e){if(!isModifierRequired(e.instance.modifiers,'hide','preventOverflow'))return e;const t=e.offsets.reference,o=find(e.instance.modifiers,(r)=>'preventOverflow'===r.name).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}function inner(e){const t=e.placement,o=t.split('-')[0],r=getClientRect(e.offsets.popper),p=getClientRect(e.offsets.reference),s=-1!==['left','right'].indexOf(o),d=-1===['top','left'].indexOf(o);return r[s?'left':'top']=p[t]-(d?r[s?'width':'height']:0),e.placement=getOppositePlacement(t),e.offsets.popper=getClientRect(r),e}var modifiers={shift:{order:100,enabled:!0,fn:shift},offset:{order:200,enabled:!0,fn:offset,offset:0},preventOverflow:{order:300,enabled:!0,fn:preventOverflow,priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:keepTogether},arrow:{order:500,enabled:!0,fn:arrow,element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:flip,behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:inner},hide:{order:800,enabled:!0,fn:hide},applyStyle:{order:900,enabled:!0,fn:applyStyle,onLoad:applyStyleOnLoad,gpuAcceleration:!0}},DEFAULTS={placement:'bottom',eventsEnabled:!0,removeOnDestroy:!1,onCreate:()=>{},onUpdate:()=>{},modifiers};class Popper{constructor(e,t,o={}){this.scheduleUpdate=()=>requestAnimationFrame(this.update),this.update=debounce(this.update.bind(this)),this.options=_extends({},Popper.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e.jquery?e[0]:e,this.popper=t.jquery?t[0]:t,setStyles(this.popper,{position:'absolute'}),this.options.modifiers={},Object.keys(_extends({},Popper.Defaults.modifiers,o.modifiers)).forEach((p)=>{this.options.modifiers[p]=_extends({},Popper.Defaults.modifiers[p]||{},o.modifiers?o.modifiers[p]:{})}),this.modifiers=Object.keys(this.options.modifiers).map((p)=>_extends({name:p},this.options.modifiers[p])).sort((p,s)=>p.order-s.order),this.modifiers.forEach((p)=>{p.enabled&&isFunction(p.onLoad)&&p.onLoad(this.reference,this.popper,this.options,p,this.state)}),this.update();const r=this.options.eventsEnabled;r&&this.enableEventListeners(),this.state.eventsEnabled=r}update(){return update.call(this)}destroy(){return destroy.call(this)}enableEventListeners(){return enableEventListeners.call(this)}disableEventListeners(){return disableEventListeners.call(this)}}Popper.Utils=('undefined'==typeof window?global:window).PopperUtils,Popper.placements=placements,Popper.Defaults=DEFAULTS;
//export default Popper;

//# sourceMappingURL=popper.min.js.map
;
/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");!function(t){var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(jQuery),function(){function t(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(t){function e(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function n(t){return(t[0]||t).nodeType}function i(){return{bindType:r.end,delegateType:r.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}}function o(){if(window.QUnit)return!1;var t=document.createElement("bootstrap");for(var e in a)if(void 0!==t.style[e])return{end:a[e]};return!1}function s(e){var n=this,i=!1;return t(this).one(l.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||l.triggerTransitionEnd(n)},e),this}var r=!1,a={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},l={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(e){var n=e.getAttribute("data-target");n&&"#"!==n||(n=e.getAttribute("href")||"");try{return t(n).length>0?n:null}catch(t){return null}},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(e){t(e).trigger(r.end)},supportsTransitionEnd:function(){return Boolean(r)},typeCheckConfig:function(t,i,o){for(var s in o)if(o.hasOwnProperty(s)){var r=o[s],a=i[s],l=a&&n(a)?"element":e(a);if(!new RegExp(r).test(l))throw new Error(t.toUpperCase()+': Option "'+s+'" provided type "'+l+'" but expected type "'+r+'".')}}};return function(){r=o(),t.fn.emulateTransitionEnd=s,l.supportsTransitionEnd()&&(t.event.special[l.TRANSITION_END]=i())}(),l}(jQuery),r=(function(t){var e="alert",i=t.fn[e],r={DISMISS:'[data-dismiss="alert"]'},a={CLOSE:"close.bs.alert",CLOSED:"closed.bs.alert",CLICK_DATA_API:"click.bs.alert.data-api"},l={ALERT:"alert",FADE:"fade",SHOW:"show"},h=function(){function e(t){n(this,e),this._element=t}return e.prototype.close=function(t){t=t||this._element;var e=this._getRootElement(t);this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},e.prototype.dispose=function(){t.removeData(this._element,"bs.alert"),this._element=null},e.prototype._getRootElement=function(e){var n=s.getSelectorFromElement(e),i=!1;return n&&(i=t(n)[0]),i||(i=t(e).closest("."+l.ALERT)[0]),i},e.prototype._triggerCloseEvent=function(e){var n=t.Event(a.CLOSE);return t(e).trigger(n),n},e.prototype._removeElement=function(e){var n=this;t(e).removeClass(l.SHOW),s.supportsTransitionEnd()&&t(e).hasClass(l.FADE)?t(e).one(s.TRANSITION_END,function(t){return n._destroyElement(e,t)}).emulateTransitionEnd(150):this._destroyElement(e)},e.prototype._destroyElement=function(e){t(e).detach().trigger(a.CLOSED).remove()},e._jQueryInterface=function(n){return this.each(function(){var i=t(this),o=i.data("bs.alert");o||(o=new e(this),i.data("bs.alert",o)),"close"===n&&o[n](this)})},e._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},o(e,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}}]),e}();t(document).on(a.CLICK_DATA_API,r.DISMISS,h._handleDismiss(new h)),t.fn[e]=h._jQueryInterface,t.fn[e].Constructor=h,t.fn[e].noConflict=function(){return t.fn[e]=i,h._jQueryInterface}}(jQuery),function(t){var e="button",i=t.fn[e],s={ACTIVE:"active",BUTTON:"btn",FOCUS:"focus"},r={DATA_TOGGLE_CARROT:'[data-toggle^="button"]',DATA_TOGGLE:'[data-toggle="buttons"]',INPUT:"input",ACTIVE:".active",BUTTON:".btn"},a={CLICK_DATA_API:"click.bs.button.data-api",FOCUS_BLUR_DATA_API:"focus.bs.button.data-api blur.bs.button.data-api"},l=function(){function e(t){n(this,e),this._element=t}return e.prototype.toggle=function(){var e=!0,n=!0,i=t(this._element).closest(r.DATA_TOGGLE)[0];if(i){var o=t(this._element).find(r.INPUT)[0];if(o){if("radio"===o.type)if(o.checked&&t(this._element).hasClass(s.ACTIVE))e=!1;else{var a=t(i).find(r.ACTIVE)[0];a&&t(a).removeClass(s.ACTIVE)}if(e){if(o.hasAttribute("disabled")||i.hasAttribute("disabled")||o.classList.contains("disabled")||i.classList.contains("disabled"))return;o.checked=!t(this._element).hasClass(s.ACTIVE),t(o).trigger("change")}o.focus(),n=!1}}n&&this._element.setAttribute("aria-pressed",!t(this._element).hasClass(s.ACTIVE)),e&&t(this._element).toggleClass(s.ACTIVE)},e.prototype.dispose=function(){t.removeData(this._element,"bs.button"),this._element=null},e._jQueryInterface=function(n){return this.each(function(){var i=t(this).data("bs.button");i||(i=new e(this),t(this).data("bs.button",i)),"toggle"===n&&i[n]()})},o(e,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}}]),e}();t(document).on(a.CLICK_DATA_API,r.DATA_TOGGLE_CARROT,function(e){e.preventDefault();var n=e.target;t(n).hasClass(s.BUTTON)||(n=t(n).closest(r.BUTTON)),l._jQueryInterface.call(t(n),"toggle")}).on(a.FOCUS_BLUR_DATA_API,r.DATA_TOGGLE_CARROT,function(e){var n=t(e.target).closest(r.BUTTON)[0];t(n).toggleClass(s.FOCUS,/^focus(in)?$/.test(e.type))}),t.fn[e]=l._jQueryInterface,t.fn[e].Constructor=l,t.fn[e].noConflict=function(){return t.fn[e]=i,l._jQueryInterface}}(jQuery),function(t){var e="carousel",r="bs.carousel",a="."+r,l=t.fn[e],h={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},c={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},u={NEXT:"next",PREV:"prev",LEFT:"left",RIGHT:"right"},d={SLIDE:"slide"+a,SLID:"slid"+a,KEYDOWN:"keydown"+a,MOUSEENTER:"mouseenter"+a,MOUSELEAVE:"mouseleave"+a,TOUCHEND:"touchend"+a,LOAD_DATA_API:"load.bs.carousel.data-api",CLICK_DATA_API:"click.bs.carousel.data-api"},f={CAROUSEL:"carousel",ACTIVE:"active",SLIDE:"slide",RIGHT:"carousel-item-right",LEFT:"carousel-item-left",NEXT:"carousel-item-next",PREV:"carousel-item-prev",ITEM:"carousel-item"},p={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},_=function(){function l(e,i){n(this,l),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(i),this._element=t(e)[0],this._indicatorsElement=t(this._element).find(p.INDICATORS)[0],this._addEventListeners()}return l.prototype.next=function(){this._isSliding||this._slide(u.NEXT)},l.prototype.nextWhenVisible=function(){document.hidden||this.next()},l.prototype.prev=function(){this._isSliding||this._slide(u.PREV)},l.prototype.pause=function(e){e||(this._isPaused=!0),t(this._element).find(p.NEXT_PREV)[0]&&s.supportsTransitionEnd()&&(s.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},l.prototype.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},l.prototype.to=function(e){var n=this;this._activeElement=t(this._element).find(p.ACTIVE_ITEM)[0];var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)t(this._element).one(d.SLID,function(){return n.to(e)});else{if(i===e)return this.pause(),void this.cycle();var o=e>i?u.NEXT:u.PREV;this._slide(o,this._items[e])}},l.prototype.dispose=function(){t(this._element).off(a),t.removeData(this._element,r),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},l.prototype._getConfig=function(n){return n=t.extend({},h,n),s.typeCheckConfig(e,n,c),n},l.prototype._addEventListeners=function(){var e=this;this._config.keyboard&&t(this._element).on(d.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&(t(this._element).on(d.MOUSEENTER,function(t){return e.pause(t)}).on(d.MOUSELEAVE,function(t){return e.cycle(t)}),"ontouchstart"in document.documentElement&&t(this._element).on(d.TOUCHEND,function(){e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout(function(t){return e.cycle(t)},500+e._config.interval)}))},l.prototype._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next();break;default:return}},l.prototype._getItemIndex=function(e){return this._items=t.makeArray(t(e).parent().find(p.ITEM)),this._items.indexOf(e)},l.prototype._getItemByDirection=function(t,e){var n=t===u.NEXT,i=t===u.PREV,o=this._getItemIndex(e),s=this._items.length-1;if((i&&0===o||n&&o===s)&&!this._config.wrap)return e;var r=(o+(t===u.PREV?-1:1))%this._items.length;return-1===r?this._items[this._items.length-1]:this._items[r]},l.prototype._triggerSlideEvent=function(e,n){var i=this._getItemIndex(e),o=this._getItemIndex(t(this._element).find(p.ACTIVE_ITEM)[0]),s=t.Event(d.SLIDE,{relatedTarget:e,direction:n,from:o,to:i});return t(this._element).trigger(s),s},l.prototype._setActiveIndicatorElement=function(e){if(this._indicatorsElement){t(this._indicatorsElement).find(p.ACTIVE).removeClass(f.ACTIVE);var n=this._indicatorsElement.children[this._getItemIndex(e)];n&&t(n).addClass(f.ACTIVE)}},l.prototype._slide=function(e,n){var i=this,o=t(this._element).find(p.ACTIVE_ITEM)[0],r=this._getItemIndex(o),a=n||o&&this._getItemByDirection(e,o),l=this._getItemIndex(a),h=Boolean(this._interval),c=void 0,_=void 0,g=void 0;if(e===u.NEXT?(c=f.LEFT,_=f.NEXT,g=u.LEFT):(c=f.RIGHT,_=f.PREV,g=u.RIGHT),a&&t(a).hasClass(f.ACTIVE))this._isSliding=!1;else if(!this._triggerSlideEvent(a,g).isDefaultPrevented()&&o&&a){this._isSliding=!0,h&&this.pause(),this._setActiveIndicatorElement(a);var m=t.Event(d.SLID,{relatedTarget:a,direction:g,from:r,to:l});s.supportsTransitionEnd()&&t(this._element).hasClass(f.SLIDE)?(t(a).addClass(_),s.reflow(a),t(o).addClass(c),t(a).addClass(c),t(o).one(s.TRANSITION_END,function(){t(a).removeClass(c+" "+_).addClass(f.ACTIVE),t(o).removeClass(f.ACTIVE+" "+_+" "+c),i._isSliding=!1,setTimeout(function(){return t(i._element).trigger(m)},0)}).emulateTransitionEnd(600)):(t(o).removeClass(f.ACTIVE),t(a).addClass(f.ACTIVE),this._isSliding=!1,t(this._element).trigger(m)),h&&this.cycle()}},l._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(r),o=t.extend({},h,t(this).data());"object"===(void 0===e?"undefined":i(e))&&t.extend(o,e);var s="string"==typeof e?e:o.slide;if(n||(n=new l(this,o),t(this).data(r,n)),"number"==typeof e)n.to(e);else if("string"==typeof s){if(void 0===n[s])throw new Error('No method named "'+s+'"');n[s]()}else o.interval&&(n.pause(),n.cycle())})},l._dataApiClickHandler=function(e){var n=s.getSelectorFromElement(this);if(n){var i=t(n)[0];if(i&&t(i).hasClass(f.CAROUSEL)){var o=t.extend({},t(i).data(),t(this).data()),a=this.getAttribute("data-slide-to");a&&(o.interval=!1),l._jQueryInterface.call(t(i),o),a&&t(i).data(r).to(a),e.preventDefault()}}},o(l,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}},{key:"Default",get:function(){return h}}]),l}();t(document).on(d.CLICK_DATA_API,p.DATA_SLIDE,_._dataApiClickHandler),t(window).on(d.LOAD_DATA_API,function(){t(p.DATA_RIDE).each(function(){var e=t(this);_._jQueryInterface.call(e,e.data())})}),t.fn[e]=_._jQueryInterface,t.fn[e].Constructor=_,t.fn[e].noConflict=function(){return t.fn[e]=l,_._jQueryInterface}}(jQuery),function(t){var e="collapse",r="bs.collapse",a=t.fn[e],l={toggle:!0,parent:""},h={toggle:"boolean",parent:"string"},c={SHOW:"show.bs.collapse",SHOWN:"shown.bs.collapse",HIDE:"hide.bs.collapse",HIDDEN:"hidden.bs.collapse",CLICK_DATA_API:"click.bs.collapse.data-api"},u={SHOW:"show",COLLAPSE:"collapse",COLLAPSING:"collapsing",COLLAPSED:"collapsed"},d={WIDTH:"width",HEIGHT:"height"},f={ACTIVES:".show, .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},p=function(){function a(e,i){n(this,a),this._isTransitioning=!1,this._element=e,this._config=this._getConfig(i),this._triggerArray=t.makeArray(t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]')),this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}return a.prototype.toggle=function(){t(this._element).hasClass(u.SHOW)?this.hide():this.show()},a.prototype.show=function(){var e=this;if(!this._isTransitioning&&!t(this._element).hasClass(u.SHOW)){var n=void 0,i=void 0;if(this._parent&&((n=t.makeArray(t(this._parent).children().children(f.ACTIVES))).length||(n=null)),!(n&&(i=t(n).data(r))&&i._isTransitioning)){var o=t.Event(c.SHOW);if(t(this._element).trigger(o),!o.isDefaultPrevented()){n&&(a._jQueryInterface.call(t(n),"hide"),i||t(n).data(r,null));var l=this._getDimension();t(this._element).removeClass(u.COLLAPSE).addClass(u.COLLAPSING),this._element.style[l]=0,this._triggerArray.length&&t(this._triggerArray).removeClass(u.COLLAPSED).attr("aria-expanded",!0),this.setTransitioning(!0);var h=function(){t(e._element).removeClass(u.COLLAPSING).addClass(u.COLLAPSE).addClass(u.SHOW),e._element.style[l]="",e.setTransitioning(!1),t(e._element).trigger(c.SHOWN)};if(s.supportsTransitionEnd()){var d="scroll"+(l[0].toUpperCase()+l.slice(1));t(this._element).one(s.TRANSITION_END,h).emulateTransitionEnd(600),this._element.style[l]=this._element[d]+"px"}else h()}}}},a.prototype.hide=function(){var e=this;if(!this._isTransitioning&&t(this._element).hasClass(u.SHOW)){var n=t.Event(c.HIDE);if(t(this._element).trigger(n),!n.isDefaultPrevented()){var i=this._getDimension();this._element.style[i]=this._element.getBoundingClientRect()[i]+"px",s.reflow(this._element),t(this._element).addClass(u.COLLAPSING).removeClass(u.COLLAPSE).removeClass(u.SHOW),this._triggerArray.length&&t(this._triggerArray).addClass(u.COLLAPSED).attr("aria-expanded",!1),this.setTransitioning(!0);var o=function(){e.setTransitioning(!1),t(e._element).removeClass(u.COLLAPSING).addClass(u.COLLAPSE).trigger(c.HIDDEN)};this._element.style[i]="",s.supportsTransitionEnd()?t(this._element).one(s.TRANSITION_END,o).emulateTransitionEnd(600):o()}}},a.prototype.setTransitioning=function(t){this._isTransitioning=t},a.prototype.dispose=function(){t.removeData(this._element,r),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},a.prototype._getConfig=function(n){return n=t.extend({},l,n),n.toggle=Boolean(n.toggle),s.typeCheckConfig(e,n,h),n},a.prototype._getDimension=function(){return t(this._element).hasClass(d.WIDTH)?d.WIDTH:d.HEIGHT},a.prototype._getParent=function(){var e=this,n=t(this._config.parent)[0],i='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return t(n).find(i).each(function(t,n){e._addAriaAndCollapsedClass(a._getTargetFromElement(n),[n])}),n},a.prototype._addAriaAndCollapsedClass=function(e,n){if(e){var i=t(e).hasClass(u.SHOW);n.length&&t(n).toggleClass(u.COLLAPSED,!i).attr("aria-expanded",i)}},a._getTargetFromElement=function(e){var n=s.getSelectorFromElement(e);return n?t(n)[0]:null},a._jQueryInterface=function(e){return this.each(function(){var n=t(this),o=n.data(r),s=t.extend({},l,n.data(),"object"===(void 0===e?"undefined":i(e))&&e);if(!o&&s.toggle&&/show|hide/.test(e)&&(s.toggle=!1),o||(o=new a(this,s),n.data(r,o)),"string"==typeof e){if(void 0===o[e])throw new Error('No method named "'+e+'"');o[e]()}})},o(a,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}},{key:"Default",get:function(){return l}}]),a}();t(document).on(c.CLICK_DATA_API,f.DATA_TOGGLE,function(e){/input|textarea/i.test(e.target.tagName)||e.preventDefault();var n=p._getTargetFromElement(this),i=t(n).data(r)?"toggle":t(this).data();p._jQueryInterface.call(t(n),i)}),t.fn[e]=p._jQueryInterface,t.fn[e].Constructor=p,t.fn[e].noConflict=function(){return t.fn[e]=a,p._jQueryInterface}}(jQuery),function(t){if("undefined"==typeof Popper)throw new Error("Bootstrap dropdown require Popper.js (https://popper.js.org)");var e="dropdown",r="bs.dropdown",a="."+r,l=t.fn[e],h=new RegExp("38|40|27"),c={HIDE:"hide"+a,HIDDEN:"hidden"+a,SHOW:"show"+a,SHOWN:"shown"+a,CLICK:"click"+a,CLICK_DATA_API:"click.bs.dropdown.data-api",KEYDOWN_DATA_API:"keydown.bs.dropdown.data-api",KEYUP_DATA_API:"keyup.bs.dropdown.data-api"},u={DISABLED:"disabled",SHOW:"show",DROPUP:"dropup",MENURIGHT:"dropdown-menu-right",MENULEFT:"dropdown-menu-left"},d={DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:".dropdown form",MENU:".dropdown-menu",NAVBAR_NAV:".navbar-nav",VISIBLE_ITEMS:".dropdown-menu .dropdown-item:not(.disabled)"},f={TOP:"top-start",TOPEND:"top-end",BOTTOM:"bottom-start",BOTTOMEND:"bottom-end"},p={placement:f.BOTTOM,offset:0,flip:!0},_={placement:"string",offset:"(number|string)",flip:"boolean"},g=function(){function l(t,e){n(this,l),this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._addEventListeners()}return l.prototype.toggle=function(){if(!this._element.disabled&&!t(this._element).hasClass(u.DISABLED)){var e=l._getParentFromElement(this._element),n=t(this._menu).hasClass(u.SHOW);if(l._clearMenus(),!n){var i={relatedTarget:this._element},o=t.Event(c.SHOW,i);if(t(e).trigger(o),!o.isDefaultPrevented()){var s=this._element;t(e).hasClass(u.DROPUP)&&(t(this._menu).hasClass(u.MENULEFT)||t(this._menu).hasClass(u.MENURIGHT))&&(s=e),this._popper=new Popper(s,this._menu,{placement:this._getPlacement(),modifiers:{offset:{offset:this._config.offset},flip:{enabled:this._config.flip}}}),"ontouchstart"in document.documentElement&&!t(e).closest(d.NAVBAR_NAV).length&&t("body").children().on("mouseover",null,t.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),t(this._menu).toggleClass(u.SHOW),t(e).toggleClass(u.SHOW).trigger(t.Event(c.SHOWN,i))}}}},l.prototype.dispose=function(){t.removeData(this._element,r),t(this._element).off(a),this._element=null,this._menu=null,null!==this._popper&&this._popper.destroy(),this._popper=null},l.prototype.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},l.prototype._addEventListeners=function(){var e=this;t(this._element).on(c.CLICK,function(t){t.preventDefault(),t.stopPropagation(),e.toggle()})},l.prototype._getConfig=function(n){var i=t(this._element).data();return void 0!==i.placement&&(i.placement=f[i.placement.toUpperCase()]),n=t.extend({},this.constructor.Default,t(this._element).data(),n),s.typeCheckConfig(e,n,this.constructor.DefaultType),n},l.prototype._getMenuElement=function(){if(!this._menu){var e=l._getParentFromElement(this._element);this._menu=t(e).find(d.MENU)[0]}return this._menu},l.prototype._getPlacement=function(){var e=t(this._element).parent(),n=this._config.placement;return e.hasClass(u.DROPUP)||this._config.placement===f.TOP?(n=f.TOP,t(this._menu).hasClass(u.MENURIGHT)&&(n=f.TOPEND)):t(this._menu).hasClass(u.MENURIGHT)&&(n=f.BOTTOMEND),n},l._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(r),o="object"===(void 0===e?"undefined":i(e))?e:null;if(n||(n=new l(this,o),t(this).data(r,n)),"string"==typeof e){if(void 0===n[e])throw new Error('No method named "'+e+'"');n[e]()}})},l._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var n=t.makeArray(t(d.DATA_TOGGLE)),i=0;i<n.length;i++){var o=l._getParentFromElement(n[i]),s=t(n[i]).data(r),a={relatedTarget:n[i]};if(s){var h=s._menu;if(t(o).hasClass(u.SHOW)&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&t.contains(o,e.target))){var f=t.Event(c.HIDE,a);t(o).trigger(f),f.isDefaultPrevented()||("ontouchstart"in document.documentElement&&t("body").children().off("mouseover",null,t.noop),n[i].setAttribute("aria-expanded","false"),t(h).removeClass(u.SHOW),t(o).removeClass(u.SHOW).trigger(t.Event(c.HIDDEN,a)))}}}},l._getParentFromElement=function(e){var n=void 0,i=s.getSelectorFromElement(e);return i&&(n=t(i)[0]),n||e.parentNode},l._dataApiKeydownHandler=function(e){if(!(!h.test(e.which)||/button/i.test(e.target.tagName)&&32===e.which||/input|textarea/i.test(e.target.tagName)||(e.preventDefault(),e.stopPropagation(),this.disabled||t(this).hasClass(u.DISABLED)))){var n=l._getParentFromElement(this),i=t(n).hasClass(u.SHOW);if((i||27===e.which&&32===e.which)&&(!i||27!==e.which&&32!==e.which)){var o=t(n).find(d.VISIBLE_ITEMS).get();if(o.length){var s=o.indexOf(e.target);38===e.which&&s>0&&s--,40===e.which&&s<o.length-1&&s++,s<0&&(s=0),o[s].focus()}}else{if(27===e.which){var r=t(n).find(d.DATA_TOGGLE)[0];t(r).trigger("focus")}t(this).trigger("click")}}},o(l,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}},{key:"Default",get:function(){return p}},{key:"DefaultType",get:function(){return _}}]),l}();t(document).on(c.KEYDOWN_DATA_API,d.DATA_TOGGLE,g._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API,d.MENU,g._dataApiKeydownHandler).on(c.CLICK_DATA_API+" "+c.KEYUP_DATA_API,g._clearMenus).on(c.CLICK_DATA_API,d.DATA_TOGGLE,function(e){e.preventDefault(),e.stopPropagation(),g._jQueryInterface.call(t(this),"toggle")}).on(c.CLICK_DATA_API,d.FORM_CHILD,function(t){t.stopPropagation()}),t.fn[e]=g._jQueryInterface,t.fn[e].Constructor=g,t.fn[e].noConflict=function(){return t.fn[e]=l,g._jQueryInterface}}(jQuery),function(t){var e="modal",r=".bs.modal",a=t.fn[e],l={backdrop:!0,keyboard:!0,focus:!0,show:!0},h={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},c={HIDE:"hide.bs.modal",HIDDEN:"hidden.bs.modal",SHOW:"show.bs.modal",SHOWN:"shown.bs.modal",FOCUSIN:"focusin.bs.modal",RESIZE:"resize.bs.modal",CLICK_DISMISS:"click.dismiss.bs.modal",KEYDOWN_DISMISS:"keydown.dismiss.bs.modal",MOUSEUP_DISMISS:"mouseup.dismiss.bs.modal",MOUSEDOWN_DISMISS:"mousedown.dismiss.bs.modal",CLICK_DATA_API:"click.bs.modal.data-api"},u={SCROLLBAR_MEASURER:"modal-scrollbar-measure",BACKDROP:"modal-backdrop",OPEN:"modal-open",FADE:"fade",SHOW:"show"},d={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",NAVBAR_TOGGLER:".navbar-toggler"},f=function(){function a(e,i){n(this,a),this._config=this._getConfig(i),this._element=e,this._dialog=t(e).find(d.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}return a.prototype.toggle=function(t){return this._isShown?this.hide():this.show(t)},a.prototype.show=function(e){var n=this;if(!this._isTransitioning){s.supportsTransitionEnd()&&t(this._element).hasClass(u.FADE)&&(this._isTransitioning=!0);var i=t.Event(c.SHOW,{relatedTarget:e});t(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),t(document.body).addClass(u.OPEN),this._setEscapeEvent(),this._setResizeEvent(),t(this._element).on(c.CLICK_DISMISS,d.DATA_DISMISS,function(t){return n.hide(t)}),t(this._dialog).on(c.MOUSEDOWN_DISMISS,function(){t(n._element).one(c.MOUSEUP_DISMISS,function(e){t(e.target).is(n._element)&&(n._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return n._showElement(e)}))}},a.prototype.hide=function(e){var n=this;if(e&&e.preventDefault(),!this._isTransitioning&&this._isShown){var i=s.supportsTransitionEnd()&&t(this._element).hasClass(u.FADE);i&&(this._isTransitioning=!0);var o=t.Event(c.HIDE);t(this._element).trigger(o),this._isShown&&!o.isDefaultPrevented()&&(this._isShown=!1,this._setEscapeEvent(),this._setResizeEvent(),t(document).off(c.FOCUSIN),t(this._element).removeClass(u.SHOW),t(this._element).off(c.CLICK_DISMISS),t(this._dialog).off(c.MOUSEDOWN_DISMISS),i?t(this._element).one(s.TRANSITION_END,function(t){return n._hideModal(t)}).emulateTransitionEnd(300):this._hideModal())}},a.prototype.dispose=function(){t.removeData(this._element,"bs.modal"),t(window,document,this._element,this._backdrop).off(r),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},a.prototype.handleUpdate=function(){this._adjustDialog()},a.prototype._getConfig=function(n){return n=t.extend({},l,n),s.typeCheckConfig(e,n,h),n},a.prototype._showElement=function(e){var n=this,i=s.supportsTransitionEnd()&&t(this._element).hasClass(u.FADE);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,i&&s.reflow(this._element),t(this._element).addClass(u.SHOW),this._config.focus&&this._enforceFocus();var o=t.Event(c.SHOWN,{relatedTarget:e}),r=function(){n._config.focus&&n._element.focus(),n._isTransitioning=!1,t(n._element).trigger(o)};i?t(this._dialog).one(s.TRANSITION_END,r).emulateTransitionEnd(300):r()},a.prototype._enforceFocus=function(){var e=this;t(document).off(c.FOCUSIN).on(c.FOCUSIN,function(n){document===n.target||e._element===n.target||t(e._element).has(n.target).length||e._element.focus()})},a.prototype._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?t(this._element).on(c.KEYDOWN_DISMISS,function(t){27===t.which&&(t.preventDefault(),e.hide())}):this._isShown||t(this._element).off(c.KEYDOWN_DISMISS)},a.prototype._setResizeEvent=function(){var e=this;this._isShown?t(window).on(c.RESIZE,function(t){return e.handleUpdate(t)}):t(window).off(c.RESIZE)},a.prototype._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){t(document.body).removeClass(u.OPEN),e._resetAdjustments(),e._resetScrollbar(),t(e._element).trigger(c.HIDDEN)})},a.prototype._removeBackdrop=function(){this._backdrop&&(t(this._backdrop).remove(),this._backdrop=null)},a.prototype._showBackdrop=function(e){var n=this,i=t(this._element).hasClass(u.FADE)?u.FADE:"";if(this._isShown&&this._config.backdrop){var o=s.supportsTransitionEnd()&&i;if(this._backdrop=document.createElement("div"),this._backdrop.className=u.BACKDROP,i&&t(this._backdrop).addClass(i),t(this._backdrop).appendTo(document.body),t(this._element).on(c.CLICK_DISMISS,function(t){n._ignoreBackdropClick?n._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===n._config.backdrop?n._element.focus():n.hide())}),o&&s.reflow(this._backdrop),t(this._backdrop).addClass(u.SHOW),!e)return;if(!o)return void e();t(this._backdrop).one(s.TRANSITION_END,e).emulateTransitionEnd(150)}else if(!this._isShown&&this._backdrop){t(this._backdrop).removeClass(u.SHOW);var r=function(){n._removeBackdrop(),e&&e()};s.supportsTransitionEnd()&&t(this._element).hasClass(u.FADE)?t(this._backdrop).one(s.TRANSITION_END,r).emulateTransitionEnd(150):r()}else e&&e()},a.prototype._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},a.prototype._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},a.prototype._checkScrollbar=function(){this._isBodyOverflowing=document.body.clientWidth<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},a.prototype._setScrollbar=function(){var e=this;if(this._isBodyOverflowing){t(d.FIXED_CONTENT).each(function(n,i){var o=t(i)[0].style.paddingRight,s=t(i).css("padding-right");t(i).data("padding-right",o).css("padding-right",parseFloat(s)+e._scrollbarWidth+"px")}),t(d.NAVBAR_TOGGLER).each(function(n,i){var o=t(i)[0].style.marginRight,s=t(i).css("margin-right");t(i).data("margin-right",o).css("margin-right",parseFloat(s)+e._scrollbarWidth+"px")});var n=document.body.style.paddingRight,i=t("body").css("padding-right");t("body").data("padding-right",n).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}},a.prototype._resetScrollbar=function(){t(d.FIXED_CONTENT).each(function(e,n){var i=t(n).data("padding-right");void 0!==i&&t(n).css("padding-right",i).removeData("padding-right")}),t(d.NAVBAR_TOGGLER).each(function(e,n){var i=t(n).data("margin-right");void 0!==i&&t(n).css("margin-right",i).removeData("margin-right")});var e=t("body").data("padding-right");void 0!==e&&t("body").css("padding-right",e).removeData("padding-right")},a.prototype._getScrollbarWidth=function(){var t=document.createElement("div");t.className=u.SCROLLBAR_MEASURER,document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},a._jQueryInterface=function(e,n){return this.each(function(){var o=t(this).data("bs.modal"),s=t.extend({},a.Default,t(this).data(),"object"===(void 0===e?"undefined":i(e))&&e);if(o||(o=new a(this,s),t(this).data("bs.modal",o)),"string"==typeof e){if(void 0===o[e])throw new Error('No method named "'+e+'"');o[e](n)}else s.show&&o.show(n)})},o(a,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}},{key:"Default",get:function(){return l}}]),a}();t(document).on(c.CLICK_DATA_API,d.DATA_TOGGLE,function(e){var n=this,i=void 0,o=s.getSelectorFromElement(this);o&&(i=t(o)[0]);var r=t(i).data("bs.modal")?"toggle":t.extend({},t(i).data(),t(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var a=t(i).one(c.SHOW,function(e){e.isDefaultPrevented()||a.one(c.HIDDEN,function(){t(n).is(":visible")&&n.focus()})});f._jQueryInterface.call(t(i),r,this)}),t.fn[e]=f._jQueryInterface,t.fn[e].Constructor=f,t.fn[e].noConflict=function(){return t.fn[e]=a,f._jQueryInterface}}(jQuery),function(t){var e="scrollspy",r=t.fn[e],a={offset:10,method:"auto",target:""},l={offset:"number",method:"string",target:"(string|element)"},h={ACTIVATE:"activate.bs.scrollspy",SCROLL:"scroll.bs.scrollspy",LOAD_DATA_API:"load.bs.scrollspy.data-api"},c={DROPDOWN_ITEM:"dropdown-item",DROPDOWN_MENU:"dropdown-menu",ACTIVE:"active"},u={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},d={OFFSET:"offset",POSITION:"position"},f=function(){function r(e,i){var o=this;n(this,r),this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(i),this._selector=this._config.target+" "+u.NAV_LINKS+","+this._config.target+" "+u.LIST_ITEMS+","+this._config.target+" "+u.DROPDOWN_ITEMS,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,t(this._scrollElement).on(h.SCROLL,function(t){return o._process(t)}),this.refresh(),this._process()}return r.prototype.refresh=function(){var e=this,n=this._scrollElement!==this._scrollElement.window?d.POSITION:d.OFFSET,i="auto"===this._config.method?n:this._config.method,o=i===d.POSITION?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),t.makeArray(t(this._selector)).map(function(e){var n=void 0,r=s.getSelectorFromElement(e);if(r&&(n=t(r)[0]),n){var a=n.getBoundingClientRect();if(a.width||a.height)return[t(n)[i]().top+o,r]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},r.prototype.dispose=function(){t.removeData(this._element,"bs.scrollspy"),t(this._scrollElement).off(".bs.scrollspy"),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},r.prototype._getConfig=function(n){if("string"!=typeof(n=t.extend({},a,n)).target){var i=t(n.target).attr("id");i||(i=s.getUID(e),t(n.target).attr("id",i)),n.target="#"+i}return s.typeCheckConfig(e,n,l),n},r.prototype._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},r.prototype._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},r.prototype._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},r.prototype._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;)this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&(void 0===this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}},r.prototype._activate=function(e){this._activeTarget=e,this._clear();var n=this._selector.split(",");n=n.map(function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'});var i=t(n.join(","));i.hasClass(c.DROPDOWN_ITEM)?(i.closest(u.DROPDOWN).find(u.DROPDOWN_TOGGLE).addClass(c.ACTIVE),i.addClass(c.ACTIVE)):(i.addClass(c.ACTIVE),i.parents(u.NAV_LIST_GROUP).prev(u.NAV_LINKS+", "+u.LIST_ITEMS).addClass(c.ACTIVE)),t(this._scrollElement).trigger(h.ACTIVATE,{relatedTarget:e})},r.prototype._clear=function(){t(this._selector).filter(u.ACTIVE).removeClass(c.ACTIVE)},r._jQueryInterface=function(e){return this.each(function(){var n=t(this).data("bs.scrollspy"),o="object"===(void 0===e?"undefined":i(e))&&e;if(n||(n=new r(this,o),t(this).data("bs.scrollspy",n)),"string"==typeof e){if(void 0===n[e])throw new Error('No method named "'+e+'"');n[e]()}})},o(r,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}},{key:"Default",get:function(){return a}}]),r}();t(window).on(h.LOAD_DATA_API,function(){for(var e=t.makeArray(t(u.DATA_SPY)),n=e.length;n--;){var i=t(e[n]);f._jQueryInterface.call(i,i.data())}}),t.fn[e]=f._jQueryInterface,t.fn[e].Constructor=f,t.fn[e].noConflict=function(){return t.fn[e]=r,f._jQueryInterface}}(jQuery),function(t){var e=t.fn.tab,i={HIDE:"hide.bs.tab",HIDDEN:"hidden.bs.tab",SHOW:"show.bs.tab",SHOWN:"shown.bs.tab",CLICK_DATA_API:"click.bs.tab.data-api"},r={DROPDOWN_MENU:"dropdown-menu",ACTIVE:"active",DISABLED:"disabled",FADE:"fade",SHOW:"show"},a={DROPDOWN:".dropdown",NAV_LIST_GROUP:".nav, .list-group",ACTIVE:".active",DATA_TOGGLE:'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',DROPDOWN_TOGGLE:".dropdown-toggle",DROPDOWN_ACTIVE_CHILD:"> .dropdown-menu .active"},l=function(){function e(t){n(this,e),this._element=t}return e.prototype.show=function(){var e=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&t(this._element).hasClass(r.ACTIVE)||t(this._element).hasClass(r.DISABLED))){var n=void 0,o=void 0,l=t(this._element).closest(a.NAV_LIST_GROUP)[0],h=s.getSelectorFromElement(this._element);l&&(o=t.makeArray(t(l).find(a.ACTIVE)),o=o[o.length-1]);var c=t.Event(i.HIDE,{relatedTarget:this._element}),u=t.Event(i.SHOW,{relatedTarget:o});if(o&&t(o).trigger(c),t(this._element).trigger(u),!u.isDefaultPrevented()&&!c.isDefaultPrevented()){h&&(n=t(h)[0]),this._activate(this._element,l);var d=function(){var n=t.Event(i.HIDDEN,{relatedTarget:e._element}),s=t.Event(i.SHOWN,{relatedTarget:o});t(o).trigger(n),t(e._element).trigger(s)};n?this._activate(n,n.parentNode,d):d()}}},e.prototype.dispose=function(){t.removeData(this._element,"bs.tab"),this._element=null},e.prototype._activate=function(e,n,i){var o=this,l=t(n).find(a.ACTIVE)[0],h=i&&s.supportsTransitionEnd()&&l&&t(l).hasClass(r.FADE),c=function(){return o._transitionComplete(e,l,h,i)};l&&h?t(l).one(s.TRANSITION_END,c).emulateTransitionEnd(150):c(),l&&t(l).removeClass(r.SHOW)},e.prototype._transitionComplete=function(e,n,i,o){if(n){t(n).removeClass(r.ACTIVE);var l=t(n.parentNode).find(a.DROPDOWN_ACTIVE_CHILD)[0];l&&t(l).removeClass(r.ACTIVE),n.setAttribute("aria-expanded",!1)}if(t(e).addClass(r.ACTIVE),e.setAttribute("aria-expanded",!0),i?(s.reflow(e),t(e).addClass(r.SHOW)):t(e).removeClass(r.FADE),e.parentNode&&t(e.parentNode).hasClass(r.DROPDOWN_MENU)){var h=t(e).closest(a.DROPDOWN)[0];h&&t(h).find(a.DROPDOWN_TOGGLE).addClass(r.ACTIVE),e.setAttribute("aria-expanded",!0)}o&&o()},e._jQueryInterface=function(n){return this.each(function(){var i=t(this),o=i.data("bs.tab");if(o||(o=new e(this),i.data("bs.tab",o)),"string"==typeof n){if(void 0===o[n])throw new Error('No method named "'+n+'"');o[n]()}})},o(e,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}}]),e}();t(document).on(i.CLICK_DATA_API,a.DATA_TOGGLE,function(e){e.preventDefault(),l._jQueryInterface.call(t(this),"show")}),t.fn.tab=l._jQueryInterface,t.fn.tab.Constructor=l,t.fn.tab.noConflict=function(){return t.fn.tab=e,l._jQueryInterface}}(jQuery),function(t){if("undefined"==typeof Popper)throw new Error("Bootstrap tooltips require Popper.js (https://popper.js.org)");var e="tooltip",r=".bs.tooltip",a=t.fn[e],l=new RegExp("(^|\\s)bs-tooltip\\S+","g"),h={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)"},c={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},u={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip"},d={SHOW:"show",OUT:"out"},f={HIDE:"hide"+r,HIDDEN:"hidden"+r,SHOW:"show"+r,SHOWN:"shown"+r,INSERTED:"inserted"+r,CLICK:"click"+r,FOCUSIN:"focusin"+r,FOCUSOUT:"focusout"+r,MOUSEENTER:"mouseenter"+r,MOUSELEAVE:"mouseleave"+r},p={FADE:"fade",SHOW:"show"},_={TOOLTIP:".tooltip",TOOLTIP_INNER:".tooltip-inner",ARROW:".arrow"},g={HOVER:"hover",FOCUS:"focus",CLICK:"click",MANUAL:"manual"},m=function(){function a(t,e){n(this,a),this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}return a.prototype.enable=function(){this._isEnabled=!0},a.prototype.disable=function(){this._isEnabled=!1},a.prototype.toggleEnabled=function(){this._isEnabled=!this._isEnabled},a.prototype.toggle=function(e){if(e){var n=this.constructor.DATA_KEY,i=t(e.currentTarget).data(n);i||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(n,i)),i._activeTrigger.click=!i._activeTrigger.click,i._isWithActiveTrigger()?i._enter(null,i):i._leave(null,i)}else{if(t(this.getTipElement()).hasClass(p.SHOW))return void this._leave(null,this);this._enter(null,this)}},a.prototype.dispose=function(){clearTimeout(this._timeout),t.removeData(this.element,this.constructor.DATA_KEY),t(this.element).off(this.constructor.EVENT_KEY),t(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&t(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,null!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},a.prototype.show=function(){var e=this;if("none"===t(this.element).css("display"))throw new Error("Please use show on visible elements");var n=t.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){t(this.element).trigger(n);var i=t.contains(this.element.ownerDocument.documentElement,this.element);if(n.isDefaultPrevented()||!i)return;var o=this.getTipElement(),r=s.getUID(this.constructor.NAME);o.setAttribute("id",r),this.element.setAttribute("aria-describedby",r),this.setContent(),this.config.animation&&t(o).addClass(p.FADE);var l="function"==typeof this.config.placement?this.config.placement.call(this,o,this.element):this.config.placement,h=this._getAttachment(l);this.addAttachmentClass(h);var c=!1===this.config.container?document.body:t(this.config.container);t(o).data(this.constructor.DATA_KEY,this),t.contains(this.element.ownerDocument.documentElement,this.tip)||t(o).appendTo(c),t(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new Popper(this.element,o,{placement:h,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:_.ARROW}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){e._handlePopperPlacementChange(t)}}),t(o).addClass(p.SHOW),"ontouchstart"in document.documentElement&&t("body").children().on("mouseover",null,t.noop);var u=function(){e.config.animation&&e._fixTransition();var n=e._hoverState;e._hoverState=null,t(e.element).trigger(e.constructor.Event.SHOWN),n===d.OUT&&e._leave(null,e)};s.supportsTransitionEnd()&&t(this.tip).hasClass(p.FADE)?t(this.tip).one(s.TRANSITION_END,u).emulateTransitionEnd(a._TRANSITION_DURATION):u()}},a.prototype.hide=function(e){var n=this,i=this.getTipElement(),o=t.Event(this.constructor.Event.HIDE),r=function(){n._hoverState!==d.SHOW&&i.parentNode&&i.parentNode.removeChild(i),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),t(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),e&&e()};t(this.element).trigger(o),o.isDefaultPrevented()||(t(i).removeClass(p.SHOW),"ontouchstart"in document.documentElement&&t("body").children().off("mouseover",null,t.noop),this._activeTrigger[g.CLICK]=!1,this._activeTrigger[g.FOCUS]=!1,this._activeTrigger[g.HOVER]=!1,s.supportsTransitionEnd()&&t(this.tip).hasClass(p.FADE)?t(i).one(s.TRANSITION_END,r).emulateTransitionEnd(150):r(),this._hoverState="")},a.prototype.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},a.prototype.isWithContent=function(){return Boolean(this.getTitle())},a.prototype.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-tooltip-"+e)},a.prototype.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0]},a.prototype.setContent=function(){var e=t(this.getTipElement());this.setElementContent(e.find(_.TOOLTIP_INNER),this.getTitle()),e.removeClass(p.FADE+" "+p.SHOW)},a.prototype.setElementContent=function(e,n){var o=this.config.html;"object"===(void 0===n?"undefined":i(n))&&(n.nodeType||n.jquery)?o?t(n).parent().is(e)||e.empty().append(n):e.text(t(n).text()):e[o?"html":"text"](n)},a.prototype.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},a.prototype._getAttachment=function(t){return c[t.toUpperCase()]},a.prototype._setListeners=function(){var e=this;this.config.trigger.split(" ").forEach(function(n){if("click"===n)t(e.element).on(e.constructor.Event.CLICK,e.config.selector,function(t){return e.toggle(t)});else if(n!==g.MANUAL){var i=n===g.HOVER?e.constructor.Event.MOUSEENTER:e.constructor.Event.FOCUSIN,o=n===g.HOVER?e.constructor.Event.MOUSELEAVE:e.constructor.Event.FOCUSOUT;t(e.element).on(i,e.config.selector,function(t){return e._enter(t)}).on(o,e.config.selector,function(t){return e._leave(t)})}t(e.element).closest(".modal").on("hide.bs.modal",function(){return e.hide()})}),this.config.selector?this.config=t.extend({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},a.prototype._fixTitle=function(){var t=i(this.element.getAttribute("data-original-title"));(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},a.prototype._enter=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusin"===e.type?g.FOCUS:g.HOVER]=!0),t(n.getTipElement()).hasClass(p.SHOW)||n._hoverState===d.SHOW?n._hoverState=d.SHOW:(clearTimeout(n._timeout),n._hoverState=d.SHOW,n.config.delay&&n.config.delay.show?n._timeout=setTimeout(function(){n._hoverState===d.SHOW&&n.show()},n.config.delay.show):n.show())},a.prototype._leave=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusout"===e.type?g.FOCUS:g.HOVER]=!1),n._isWithActiveTrigger()||(clearTimeout(n._timeout),n._hoverState=d.OUT,n.config.delay&&n.config.delay.hide?n._timeout=setTimeout(function(){n._hoverState===d.OUT&&n.hide()},n.config.delay.hide):n.hide())},a.prototype._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},a.prototype._getConfig=function(n){return(n=t.extend({},this.constructor.Default,t(this.element).data(),n)).delay&&"number"==typeof n.delay&&(n.delay={show:n.delay,hide:n.delay}),n.title&&"number"==typeof n.title&&(n.title=n.title.toString()),n.content&&"number"==typeof n.content&&(n.content=n.content.toString()),s.typeCheckConfig(e,n,this.constructor.DefaultType),n},a.prototype._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},a.prototype._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(l);null!==n&&n.length>0&&e.removeClass(n.join(""))},a.prototype._handlePopperPlacementChange=function(t){this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},a.prototype._fixTransition=function(){var e=this.getTipElement(),n=this.config.animation;null===e.getAttribute("x-placement")&&(t(e).removeClass(p.FADE),this.config.animation=!1,this.hide(),this.show(),this.config.animation=n)},a._jQueryInterface=function(e){return this.each(function(){var n=t(this).data("bs.tooltip"),o="object"===(void 0===e?"undefined":i(e))&&e;if((n||!/dispose|hide/.test(e))&&(n||(n=new a(this,o),t(this).data("bs.tooltip",n)),"string"==typeof e)){if(void 0===n[e])throw new Error('No method named "'+e+'"');n[e]()}})},o(a,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}},{key:"Default",get:function(){return u}},{key:"NAME",get:function(){return e}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return f}},{key:"EVENT_KEY",get:function(){return r}},{key:"DefaultType",get:function(){return h}}]),a}();return t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=a,m._jQueryInterface},m}(jQuery));!function(s){var a="popover",l=".bs.popover",h=s.fn[a],c=new RegExp("(^|\\s)bs-popover\\S+","g"),u=s.extend({},r.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),d=s.extend({},r.DefaultType,{content:"(string|element|function)"}),f={FADE:"fade",SHOW:"show"},p={TITLE:".popover-title",CONTENT:".popover-content"},_={HIDE:"hide"+l,HIDDEN:"hidden"+l,SHOW:"show"+l,SHOWN:"shown"+l,INSERTED:"inserted"+l,CLICK:"click"+l,FOCUSIN:"focusin"+l,FOCUSOUT:"focusout"+l,MOUSEENTER:"mouseenter"+l,MOUSELEAVE:"mouseleave"+l},g=function(r){function h(){return n(this,h),t(this,r.apply(this,arguments))}return e(h,r),h.prototype.isWithContent=function(){return this.getTitle()||this._getContent()},h.prototype.addAttachmentClass=function(t){s(this.getTipElement()).addClass("bs-popover-"+t)},h.prototype.getTipElement=function(){return this.tip=this.tip||s(this.config.template)[0]},h.prototype.setContent=function(){var t=s(this.getTipElement());this.setElementContent(t.find(p.TITLE),this.getTitle()),this.setElementContent(t.find(p.CONTENT),this._getContent()),t.removeClass(f.FADE+" "+f.SHOW)},h.prototype._getContent=function(){return this.element.getAttribute("data-content")||("function"==typeof this.config.content?this.config.content.call(this.element):this.config.content)},h.prototype._cleanTipClass=function(){var t=s(this.getTipElement()),e=t.attr("class").match(c);null!==e&&e.length>0&&t.removeClass(e.join(""))},h._jQueryInterface=function(t){return this.each(function(){var e=s(this).data("bs.popover"),n="object"===(void 0===t?"undefined":i(t))?t:null;if((e||!/destroy|hide/.test(t))&&(e||(e=new h(this,n),s(this).data("bs.popover",e)),"string"==typeof t)){if(void 0===e[t])throw new Error('No method named "'+t+'"');e[t]()}})},o(h,null,[{key:"VERSION",get:function(){return"4.0.0-alpha.6"}},{key:"Default",get:function(){return u}},{key:"NAME",get:function(){return a}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return _}},{key:"EVENT_KEY",get:function(){return l}},{key:"DefaultType",get:function(){return d}}]),h}(r);s.fn[a]=g._jQueryInterface,s.fn[a].Constructor=g,s.fn[a].noConflict=function(){return s.fn[a]=h,g._jQueryInterface}}(jQuery)}();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







// require_tree .
;
