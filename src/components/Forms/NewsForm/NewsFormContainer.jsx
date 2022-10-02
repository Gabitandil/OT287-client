import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import NewsForm from './NewsForm'
import validationSchema from '../../../schemas/news'
import httpService from '../../../services/httpService';

const NewsFormContainer = () => {
  const { id } = useParams()
  const [initialValues, setInitialValues] = useState({
    name: '',
    content: '',
    image: '',
    uploadedImage: '',
    categoryId: 1,
  })
  const [errorStatus, setErrorStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const getData = await httpService('get', `news/${id}`)
          const uploadedImage = getData.body.image.split('com/')
          setInitialValues({
            name: getData.body.name,
            content: getData.body.content,
            image: getData.body.image,
            uploadedImage: uploadedImage[1],
            categoryId: getData.body.categoryId,
          })
        } catch (error) {
          setErrorStatus(error.response.status)
          setErrorMessage(error.response.statusText)
        }
      })()
    }
  }, [id])

  const onSubmitForm = async (values, idToEdit) => {
    try {
      if (idToEdit) {
        // If it's an edition, use put
        const data = await httpService('put', `news/${id}`, {
          name: values.name,
          content: values.content,
          image: values.image,
          categoryId: values.category,
        })
        if (data.code === 200) {
          navigate('/')
        } else {
          setErrorStatus(data.response.status)
          setErrorMessage(data.response.statusText)
        }
      } else {
        // If it's a new entry, then post the data
        const data = await httpService('post', 'news', {
          name: values.name,
          content: values.content,
          image: values.image,
          categoryId: values.categoryId,
        })
        if (data.code === 200) {
          navigate('/')
        } else {
          setErrorStatus(data.response.status)
          setErrorMessage(data.response.statusText)
        }
      }
    } catch (error) {
      setErrorStatus(error.response)
    }
  }

  return (
    <NewsForm
      key={id}
      id={id}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmitForm={onSubmitForm}
      error={errorStatus}
      errorMessage={errorMessage}
    />
  )
}

export default NewsFormContainer
