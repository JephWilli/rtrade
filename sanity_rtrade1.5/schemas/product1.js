export default {
    name: 'smart_watches',
    title: 'Smart_watches',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        }
      },
      { 
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      { 
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        }
      },
      { 
        name: 'price',
        title: 'Price',
        type: 'number',
        options: {
          decimals: 4,
          step: 0.0001
        }
      },
      { 
        name: 'details',
        title: 'Details',
        type: 'string',
      }
    ]
  }