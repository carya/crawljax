//Wrapper for Input Form Fields
App.FormField = Ember.View.extend({
	tagName: 'div',
	classNameBindings: ['isForm: control-group'],
	errorText: null,
	label: null,
	isForm: true,
	template: Ember.Handlebars.compile([
	    '{{#if view.label}}{{view view.labelView viewName="labelView"}}{{/if}}',
	    '<div {{bindAttr class="isForm: controls"}}>',
	    '  {{view view.inputField viewName="inputField"}}',
	    '  {{view view.errorView viewName="errorView"}}',
	    '</div>'].join("\n")),
	labelView: Ember.View.extend({
		tagName: 'label',
		classNames: ['control-label'],
		template: Ember.Handlebars.compile('{{view.value}}'),
		valueBinding: 'parentView.label',
		inputElementId: '',
		forBinding: 'inputElementId',
		attributeBindings: ['for']
	}),
	inputField: Ember.View.extend({
		tagName: 'span',
		classNames: ['uneditable-input'],
		template: Ember.Handlebars.compile('{{view.value}}'),
		valueBinding: 'parentView.value'
	}),
	errorView: Ember.View.extend({
		tagName: 'span',
		classNameBindings: ['errorText:hint'],
		template: Ember.Handlebars.compile('{{view.errorText}}'),
		errorTextBinding: 'parentView.errorText'
	}),
	didInsertElement: function() {
	    this.set('labelView.inputElementId', this.get('inputField.elementId'));
	}
});

//Text Field
App.FormTextField = App.FormField.extend({
	type: 'text',
	inputField: Ember.TextField.extend({
		valueBinding: 'parentView.value',
		placeholderBinding: 'parentView.placeholder',
		disabledBinding: 'parentView.disabled',
		requiredBinding: 'parentView.required',
		patternBinding: 'parentView.pattern',
		typeBinding: 'parentView.type',
		minBinding: 'parentView.min',
		maxlengthBinding: 'parentView.maxlength',
		classNameBindings: 'parentView.inputClassNames',
		attributeBindings: ['required', 'pattern', 'type', 'min', 'max']
	})
});

//Checkbox
App.FormCheckbox = App.FormField.extend({
	template: Ember.Handlebars.compile([
	    '<div class="controls">',
	    '<label class="checkbox">',
	    '  	{{view view.inputField viewName="inputField"}}',
	    '	{{view.label}}',
	    '</label>',
	    '</div>'].join("\n")),
	labelView: null,
	inputField: Ember.Checkbox.extend({
		checkedBinding:   'parentView.checked',
	    disabledBinding: 'parentView.disabled',
	    classNameBindings: 'parentView.inputClassNames'
	}),
	didInsertElement: function() {}
});

//Select
App.FormSelect = App.FormField.extend({
	optionLabelPath: 'content',
	optionValuePath: 'content',
	inputField: Ember.Select.extend({
		contentBinding: 'parentView.content',
		optionLabelPathBinding: 'parentView.optionLabelPath',
	    optionValuePathBinding: 'parentView.optionValuePath',
		selectionBinding: 'parentView.selection',
		valueBinding: 'parentView.value',
		disabledBinding: 'parentView.disabled',
		classNameBindings: 'parentView.inputClassNames'
	})
});

//Bootstrap Nav
App.NavView = Ember.View.extend({
	tagName: 'li',
	classNameBindings: ['active'],
	route: null,
	active: function() {
		var path = this.get('controller.controllers.application.currentPath');
	    return path == this.route;
	}.property()
});