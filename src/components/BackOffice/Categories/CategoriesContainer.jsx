import React, { useEffect, useState } from 'react'
import Categories from './Categories'
import httpService from '../../../services/httpService'

const cardFields = {
  title: 'name',
  content: 'description',
  imageUrl: null,
}

const nestedRoutes = {
  create: '',
  edit: 'edit',
  delete: '',
}

const CategoriesContainer = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await httpService('get', 'categories')
        if (response.code === 200) {
          setData(response.body)
        } else {
          setError(`Ha ocurrido un error: ${response.message}`)
        }
      } catch (err) {
        setError(`Ha ocurrido un error: ${err.response}`)
      }
    }

    getCategories()
  }, [])

  return (
    <Categories
      data={data}
      cardFields={cardFields}
      nestedRoutes={nestedRoutes}
      error={error}
    />
  )
}

export default CategoriesContainer
