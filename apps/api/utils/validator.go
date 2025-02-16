package utils

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

type (
	Errors struct {
		Error       bool
		FailedField string
		Tag         string
		Value       interface{}
	}

	XValidator struct {
		validator *validator.Validate
	}
)

func newXValidator() *XValidator {
	v := validator.New()
	v.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})

	return &XValidator{
		validator: v,
	}
}

func (v *XValidator) Validate(data interface{}) map[string]string {
	validationErrors := []Errors{}

	errs := v.validator.Struct(data)
	if errs != nil {
		for _, err := range errs.(validator.ValidationErrors) {
			var elem Errors

			elem.FailedField = err.Field()
			elem.Tag = err.Tag()
			elem.Value = err.Value()
			elem.Error = true

			// Customize error message for the error tags
			if elem.Tag == "required" {
				elem.Tag = fmt.Sprintf("%s is required", elem.FailedField)
			}
			if elem.Tag == "email" {
				elem.Tag = fmt.Sprintf("%s must be valid", elem.FailedField)
			}
			if elem.Tag == "min" {
				elem.Tag = fmt.Sprintf("%s must be atleat %s characters", elem.FailedField, err.Param())
			}
			if elem.Tag == "max" {
				elem.Tag = fmt.Sprintf("%s must be no longer than %s characters", elem.FailedField, err.Param())
			}
			if elem.Tag == "oneof" {
				elem.Tag = fmt.Sprintf("%s must be one of [%s]", elem.FailedField, strings.Join(strings.Split(err.Param(), " "), ", "))
			}

			validationErrors = append(validationErrors, elem)
		}
	}

	errorsMap := map[string]string{}
	if len(validationErrors) > 0 {
		for _, err := range validationErrors {
			errorsMap[err.FailedField] = err.Tag
		}
	}

	return errorsMap
}

var BodyValidator = newXValidator()
