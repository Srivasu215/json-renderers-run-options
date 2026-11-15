// node_modules/json-write-path/src/v4/utils/toArray.js
var e = (e) => Array.isArray(e) ? e : [e], t = (e, t, n) => {
	e[t] = n;
}, n = {
	set: t,
	push: (t, n, r) => {
		t[n].push(...e(r));
	},
	unshift: (t, n, r) => {
		t[n].unshift(...e(r));
	},
	pushToRows: (t, n, r) => {
		t[n].forEach((t) => {
			t.children.push(...structuredClone(e(r)));
		});
	},
	unshiftToRows: (t, n, r) => {
		t[n].forEach((t) => {
			t.children.unshift(...structuredClone(e(r)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, r = (e) => typeof e == "object" && !!e && !Array.isArray(e), i = (e, t) => {
	if (!r(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = d(t, i);
	return n;
}, a = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => d(t, e));
}, o = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, s = (e, t) => o(e, t), c = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, l = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, u = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: l,
		applyTemplate: e
	});
}, d = (e, t, n) => {
	let r = e, l = t;
	c(r, l, n);
	let u = structuredClone(l);
	return typeof u == "string" ? o(u, r) : (typeof u != "object" || !u || ("textContent" in u && (u.textContent = s(u?.textContent, r)), "attributes" in u && (u.attributes = i(u?.attributes, r)), "children" in u && (u.children = a(u?.children, r))), u);
};
u(d);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var f = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, p = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, m = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: p,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, h = (e, t) => {
	let n = e, r = t;
	return f(n, r), n.map((e) => d(e, r));
};
m((e, t) => {
	let n = e;
	return f(n, t), n.map((e) => d(e, e[t]));
}, h);
// node_modules/json-transformer-funcs/src/v24/findByRole.js
var g = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = g(n, t);
		if (e) return e;
	}
	return null;
}, _ = (e, t, n) => {
	let r = t.fileName, i = g(e[r], t.dataRole), a = t.dataRole ? i : e[t.fileName], o = [...t.filePath ?? []], s = o.pop();
	return {
		parent: o.reduce((e, t) => e[t], a),
		key: s
	};
}, v = (e, r, i, a) => {
	a && console.log("v4 index :", e, r, i);
	let { parent: o, key: s } = _(e, r, a);
	(n[r.action] || t)(o, s, i);
}, y = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = y(n, t);
		if (e) return e;
	}
	return null;
}, b = (e, t) => {
	let n = e[t.fileName], r = t.dataRole ? y(n, t.dataRole) : n;
	return (t.filePath ?? []).reduce((e, t) => e[t], r);
}, x = {
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	}
}, S = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, C = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "TagsCatalogSchema",
	description: "JSON Schema for @keshavsoft/spec-repo tags.json catalog",
	type: "object",
	patternProperties: { "^[a-z0-9]+$": {
		type: "object",
		required: [
			"allowsTextContent",
			"allowsChildren",
			"allowedAttributes"
		],
		properties: {
			allowsTextContent: {
				type: "boolean",
				description: "Indicates whether the element permits direct textContent"
			},
			allowsChildren: {
				type: "boolean",
				description: "Indicates whether the element can contain child DOM elements"
			},
			allowedAttributes: {
				type: "array",
				items: { type: "string" },
				description: "List of specifically allowed HTML attributes for this tag"
			},
			childTags: {
				type: "array",
				items: { type: "string" },
				description: "Permitted child tag names if restricted"
			}
		},
		additionalProperties: !1
	} }
}, w = {
	table: {
		simple: {
			base: {
				tagName: "div",
				attributes: { "data-role": "table-parent" },
				children: [{
					tagName: "table",
					attributes: { class: "table table-hover table-striped align-middle border mb-0" },
					children: [
						{
							tagName: "colgroup",
							attributes: { "data-role": "table-colgroup" },
							children: []
						},
						{
							tagName: "thead",
							attributes: {
								class: "table-dark",
								"data-role": "table-header"
							},
							children: [{
								tagName: "tr",
								attributes: { "data-role": "table-header-row" },
								children: []
							}]
						},
						{
							tagName: "tbody",
							attributes: { "data-role": "table-body" },
							children: []
						},
						{
							tagName: "tfoot",
							attributes: { "data-role": "table-footer" },
							children: [{
								tagName: "tr",
								attributes: { "data-role": "table-footer-row" },
								children: []
							}]
						}
					]
				}]
			},
			single: [{
				narration: "Build column widths",
				destinationPath: {
					fileName: "base",
					dataRole: "table-colgroup",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildColGroup",
				func: "fromCollection"
			}, {
				narration: "Build table header",
				destinationPath: {
					fileName: "base",
					dataRole: "table-header-row",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildHeader",
				func: "fromCollection"
			}],
			double: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: {
					rowKey: "buildBodyTr",
					columnKey: "buildBodyCell"
				},
				func: "twoDimensional"
			}],
			rowOnColumn: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				templateKey: {
					rowKey: "buildBodyTr",
					columnKey: "buildBodyCell"
				}
			}],
			options: {
				serial: [
					{
						narration: "Prepend the serial column width to the table colgroup.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-colgroup",
							filePath: ["children"],
							action: "unshift"
						},
						sourcePath: null,
						templateKey: "colGroupForSerial",
						func: null
					},
					{
						narration: "Prepend the serial header cell to the table header row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-header-row",
							filePath: ["children"],
							action: "unshift"
						},
						sourcePath: null,
						templateKey: "headerSerialCell",
						func: null
					},
					{
						narration: "Prepend the serial number cell into each table body row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-body",
							filePath: ["children"],
							action: "unshiftSerialToRows"
						},
						sourcePath: null,
						templateKey: "buildBodyCell",
						func: null
					},
					{
						narration: "Prepend the serial footer cell to the table footer row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-footer-row",
							filePath: ["children"],
							action: "unshift"
						},
						sourcePath: null,
						templateKey: "headerSerialCell",
						func: null
					}
				],
				options: [
					{
						narration: "Append the options column width to the table colgroup.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-colgroup",
							filePath: ["children"],
							action: "push"
						},
						sourcePath: null,
						templateKey: "colGroupForOption",
						func: null
					},
					{
						narration: "Append the options header cell to the table header row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-header-row",
							filePath: ["children"],
							action: "push"
						},
						sourcePath: null,
						templateKey: "headerForOption",
						func: null
					},
					{
						narration: "Append the options button cell into each table body row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-body",
							filePath: ["children"],
							action: "pushToRows"
						},
						sourcePath: null,
						templateKey: "optionsButtonCell",
						func: null
					},
					{
						narration: "Append the options footer cell to the table footer row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-footer-row",
							filePath: ["children"],
							action: "push"
						},
						sourcePath: null,
						templateKey: "tdWithButtonSaveWarning",
						func: null
					}
				],
				search: [{
					narration: "Prepend the search row to top of the table.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-parent",
						filePath: ["children"],
						action: "unshift"
					},
					sourcePath: null,
					templateKey: "tableSearch",
					func: null
				}]
			}
		},
		withFooter: {
			base: {
				tagName: "table",
				attributes: { class: "table table-hover table-striped align-middle border mb-0" },
				children: [
					{
						tagName: "colgroup",
						attributes: { "data-role": "table-colgroup" },
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header"
						},
						children: [{
							tagName: "tr",
							attributes: { "data-role": "table-header-row" },
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: { "data-role": "table-body" },
						children: []
					},
					{
						tagName: "tfoot",
						attributes: { "data-role": "table-footer" },
						children: [{
							tagName: "tr",
							attributes: { "data-role": "table-footer-row" },
							children: []
						}]
					}
				]
			},
			single: [
				{
					narration: "Build column widths",
					destinationPath: {
						fileName: "base",
						dataRole: "table-colgroup",
						filePath: ["children"]
					},
					sourcePath: {
						fileName: "data",
						filePath: ["columns"]
					},
					templateKey: "buildColGroup",
					func: "fromCollection"
				},
				{
					narration: "Build table header",
					destinationPath: {
						fileName: "base",
						dataRole: "table-header-row",
						filePath: ["children"]
					},
					sourcePath: {
						fileName: "data",
						filePath: ["columns"]
					},
					templateKey: "buildHeader",
					func: "fromCollection"
				},
				{
					narration: "Build footer input cells",
					destinationPath: {
						fileName: "base",
						dataRole: "table-footer-row",
						filePath: ["children"]
					},
					sourcePath: {
						fileName: "data",
						filePath: ["columns"]
					},
					templateKey: "buildFooter",
					func: "fromCollection"
				}
			],
			double: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				func: "twoDimensional"
			}]
		},
		bodyOnly: {
			base: {
				tagName: "tbody",
				attributes: { "data-role": "table-body" },
				children: []
			},
			single: [],
			double: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				func: "twoDimensional"
			}]
		},
		footerOnly: {
			base: {
				tagName: "tfoot",
				attributes: { "data-role": "table-footer" },
				children: [{
					tagName: "tr",
					attributes: { "data-role": "table-footer-row" },
					children: []
				}]
			},
			single: [{
				narration: "Build footer input cells",
				destinationPath: {
					fileName: "base",
					dataRole: "table-footer-row",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildFooter",
				func: "fromCollection"
			}],
			double: []
		},
		headerOnly: {
			base: {
				tagName: "table",
				attributes: { class: "table table-hover table-striped align-middle border mb-0" },
				children: [
					{
						tagName: "colgroup",
						attributes: { "data-role": "table-colgroup" },
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header"
						},
						children: [{
							tagName: "tr",
							attributes: { "data-role": "table-header-row" },
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: { "data-role": "table-body" },
						children: []
					}
				]
			},
			single: [{
				narration: "Build column widths",
				destinationPath: {
					fileName: "base",
					dataRole: "table-colgroup",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildColGroup",
				func: "fromCollection"
			}, {
				narration: "Build table header",
				destinationPath: {
					fileName: "base",
					dataRole: "table-header-row",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildHeader",
				func: "fromCollection"
			}],
			double: []
		},
		options: {
			serial: [
				{
					narration: "Prepend the serial column width to the table colgroup.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-colgroup",
						filePath: ["children"],
						action: "unshift"
					},
					sourcePath: null,
					templateKey: "colGroupForSerial",
					func: null
				},
				{
					narration: "Prepend the serial header cell to the table header row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-header-row",
						filePath: ["children"],
						action: "unshift"
					},
					sourcePath: null,
					templateKey: "headerSerialCell",
					func: null
				},
				{
					narration: "Prepend the serial number cell into each table body row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-body",
						filePath: ["children"],
						action: "unshiftSerialToRows"
					},
					sourcePath: null,
					templateKey: "buildBodyCell",
					func: null
				},
				{
					narration: "Prepend the serial footer cell to the table footer row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-footer-row",
						filePath: ["children"],
						action: "unshift"
					},
					sourcePath: null,
					templateKey: "headerSerialCell",
					func: null
				}
			],
			options: [
				{
					narration: "Append the options column width to the table colgroup.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-colgroup",
						filePath: ["children"],
						action: "push"
					},
					sourcePath: null,
					templateKey: "colGroupForOption",
					func: null
				},
				{
					narration: "Append the options header cell to the table header row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-header-row",
						filePath: ["children"],
						action: "push"
					},
					sourcePath: null,
					templateKey: "headerForOption",
					func: null
				},
				{
					narration: "Append the options button cell into each table body row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-body",
						filePath: ["children"],
						action: "pushToRows"
					},
					sourcePath: null,
					templateKey: "optionsButtonCell",
					func: null
				},
				{
					narration: "Append the options footer cell to the table footer row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-footer-row",
						filePath: ["children"],
						action: "push"
					},
					sourcePath: null,
					templateKey: "tdWithButtonSaveWarning",
					func: null
				}
			],
			search: [{
				narration: "Prepend the search row to top of the table.",
				destinationPath: {
					fileName: "base",
					dataRole: "table-parent",
					filePath: ["children"],
					action: "unshift"
				},
				sourcePath: null,
				templateKey: "tableSearch",
				func: null
			}]
		}
	},
	select: {
		base: {
			tagName: "div",
			attributes: { "data-role": "select-container" },
			children: []
		},
		single: [{
			narration: "Build select options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			sourcePath: {
				fileName: "data",
				filePath: ["data"]
			},
			templateKey: "buildOption",
			func: "fromCollection"
		}],
		double: [],
		columnOnRow: [{
			narration: "Build selects with options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			templateKey: {
				columnKey: "buildSelect",
				rowKey: "buildOption"
			}
		}]
	},
	dataList: {
		simple: {
			base: {
				tagName: "div",
				attributes: { "data-role": "datalist-container" },
				children: []
			},
			single: [],
			double: [],
			columnOnRow: [{
				narration: "Build datalists with options",
				destinationPath: {
					fileName: "base",
					filePath: ["children"]
				},
				templateKey: {
					columnKey: "buildDataList",
					rowKey: "buildOption"
				}
			}]
		},
		base: {
			tagName: "div",
			attributes: { "data-role": "datalist-container" },
			children: []
		},
		single: [],
		double: [],
		columnOnRow: [{
			narration: "Build datalists with options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			templateKey: {
				columnKey: "buildDataList",
				rowKey: "buildOption"
			}
		}]
	},
	selectOptionsOnly: {
		base: [],
		single: [{
			narration: "Build options array",
			destinationPath: {
				fileName: "base",
				filePath: []
			},
			sourcePath: {
				fileName: "data",
				filePath: ["data"]
			},
			templateKey: "buildOption",
			func: "fromCollection"
		}],
		double: []
	},
	searchInput: {
		base: {
			tagName: "div",
			attributes: { class: "d-flex align-items-center gap-2" },
			children: [{
				tagName: "label",
				textContent: "${label}",
				attributes: {
					class: "form-label mb-0 text-nowrap fw-semibold",
					for: "${id}"
				}
			}, {
				tagName: "input",
				attributes: {
					type: "search",
					placeholder: "${placeholder}",
					class: "form-control",
					id: "${id}"
				}
			}]
		},
		single: [],
		double: []
	},
	form: {
		simple: {
			base: {
				tagName: "div",
				attributes: { class: "card shadow-sm border-0" },
				children: [
					{
						tagName: "div",
						attributes: { class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center" },
						children: [{
							tagName: "h2",
							textContent: "Data Entry Form",
							attributes: { class: "h5 fw-bold mb-0 text-dark" }
						}]
					},
					{
						tagName: "div",
						attributes: { class: "card-body p-4" },
						children: [{
							tagName: "form",
							attributes: {
								id: "form-body-id",
								"data-role": "form-body"
							},
							children: []
						}]
					},
					{
						tagName: "div",
						attributes: { class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2" },
						children: [{
							tagName: "button",
							textContent: "Reset",
							attributes: {
								type: "reset",
								class: "btn btn-outline-secondary"
							}
						}, {
							tagName: "button",
							textContent: "Submit",
							attributes: {
								type: "submit",
								class: "btn btn-primary"
							}
						}]
					}
				]
			},
			single: [{
				narration: "Build form fields from columns",
				destinationPath: {
					fileName: "base",
					dataRole: "form-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildFormField",
				func: "fromCollection"
			}],
			double: []
		},
		base: {
			tagName: "div",
			attributes: { class: "card shadow-sm border-0" },
			children: [
				{
					tagName: "div",
					attributes: { class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center" },
					children: [{
						tagName: "h2",
						textContent: "Data Entry Form",
						attributes: { class: "h5 fw-bold mb-0 text-dark" }
					}]
				},
				{
					tagName: "div",
					attributes: { class: "card-body p-4" },
					children: [{
						tagName: "form",
						attributes: {
							id: "form-body-id",
							"data-role": "form-body"
						},
						children: []
					}]
				},
				{
					tagName: "div",
					attributes: { class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2" },
					children: [{
						tagName: "button",
						textContent: "Reset",
						attributes: {
							type: "reset",
							class: "btn btn-outline-secondary"
						}
					}, {
						tagName: "button",
						textContent: "Submit",
						attributes: {
							type: "submit",
							class: "btn btn-primary"
						}
					}]
				}
			]
		},
		single: [{
			narration: "Build form fields from columns",
			destinationPath: {
				fileName: "base",
				dataRole: "form-body",
				filePath: ["children"]
			},
			sourcePath: {
				fileName: "data",
				filePath: ["columns"]
			},
			templateKey: "buildFormField",
			func: "fromCollection"
		}],
		double: []
	}
}, T = {
	name: "spec-repo",
	version: "1.6.1"
}, E = ({ spec: e, tags: t, tagsSchema: n, definitions: r }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: T,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r
	});
}, D = x;
E({
	spec: x,
	tags: S,
	tagsSchema: C,
	definitions: w
});
// node_modules/json-instruction-single/src/v6/getResult.js
var O = {
	applyTemplate: d,
	fromCollection: h
}, k = (e, t, n) => e?.sourcePath === null ? null : b(t, e.sourcePath), A = (e, t, n) => {
	let r = t?.spec ?? D, i = e.templateKey, a = e?.func, o = r[i], s = k(e, t, n), c = a === null ? o : O[e.func](s, o);
	return s === null ? o : c;
}, j = (e, t, n) => {
	let r = n;
	r && console.log("runSingleInstruction 1 :", e, t);
	let i = A(e, t, n);
	r && console.log("runSingleInstruction 2 :", i), v(t, e.destinationPath, i);
}, M = (e, t, n, r) => {
	e.forEach((e) => {
		j(e, t, n, r);
	});
}, N = (e, t) => !e || typeof e != "object" ? !1 : e.attributes?.["data-role"] === t || Array.isArray(e.children) && e.children.some((e) => N(e, t)), P = (e = [], t) => e.filter(({ destinationPath: e }) => N(t, e?.dataRole)), F = ({ base: e, options: t = {}, optionDefs: n = {}, showLog: r = !1 } = {}) => {
	if (!e) return e;
	let i = { base: e };
	if (t.showSearch && n.search) {
		let t = P(n.search, e);
		r && console.log("[runOptions:search]", t), M(t, i, r);
	}
	if ((t.showSerial || t.serial) && n.serial) {
		let t = P(n.serial, e);
		r && console.log("[runOptions:serial]", t), M(t, i, r);
	}
	if ((t.showOptions || t.options) && n.options) {
		let t = P(n.options, e);
		r && console.log("[runOptions:options]", t), M(t, i, r);
	}
	return e;
};
export { F as default, F as runOptions };
