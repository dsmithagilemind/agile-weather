import type { EditZipSearchById, UpdateZipSearchInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'



const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}


type FormZipSearch = NonNullable<EditZipSearchById['zipSearch']>

interface ZipSearchFormProps {
  zipSearch?: EditZipSearchById['zipSearch']
  onSave: (data: UpdateZipSearchInput, id?: FormZipSearch['id']) => void
  error: RWGqlError
  loading: boolean
}

const ZipSearchForm = (props: ZipSearchFormProps) => {
  const onSubmit = (data: FormZipSearch) => {

    props.onSave(data, props?.zipSearch?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormZipSearch> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="zip"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Zip
        </Label>

        <TextField
          name="zip"
          defaultValue={props.zipSearch?.zip}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />


        <FieldError name="zip" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DatetimeLocalField
          name="date"
          defaultValue={formatDatetime(props.zipSearch?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />


        <FieldError name="date" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ZipSearchForm
