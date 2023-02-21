export const createCategory = {
  createData: {
    status: 201,
    category: {
      id: 1,
      created_at: '2023-01-31T04:31:07.638Z',
      updated_at: '2023-01-31T04:31:07.638Z'
    },
    category_language: [
      {
        id: 1,
        category_id: 1,
        language_id: 1,
        category_name: 'C# Management Eng',
        sort_no: 1,
        status: 2,
        created_at: '2023-01-31T04:31:07.638Z',
        updated_at: '2023-01-31T04:31:07.638Z'
      },
      {
        id: 2,
        category_id: 1,
        language_id: 2,
        category_name: 'C# Management Hindi',
        sort_no: 1,
        status: 2,
        created_at: '2023-01-31T04:31:07.638Z',
        updated_at: '2023-01-31T04:31:07.638Z'
      },
      {
        id: 3,
        category_id: 1,
        language_id: 3,
        category_name: 'C# Management Gujarati',
        sort_no: 1,
        status: 2,
        created_at: '2023-01-31T04:31:07.638Z',
        updated_at: '2023-01-31T04:31:07.638Z'
      }
    ]
  }
};

export const categoryData = {
  categoryDataGet: {
    status: 200,
    categories: [
      {
        category: {
          id: 1,
          created_at: '2023-01-31T04:31:07.638Z',
          updated_at: '2023-01-31T04:31:07.638Z'
        },
        category_list: [
          {
            id: 1,
            category_id: 1,
            language_id: 1,
            category_name: 'C# Management Eng',
            sort_no: 1,
            status: 2,
            created_at: '2023-01-31T04:31:07.638Z',
            updated_at: '2023-01-31T04:31:07.638Z'
          },
          {
            id: 2,
            category_id: 1,
            language_id: 1,
            category_name: 'CSE',
            sort_no: 1,
            status: 1,
            created_at: '2023-01-31T04:31:07.638Z',
            updated_at: '2023-01-31T04:31:07.638Z'
          },
          {
            id: 3,
            category_id: 1,
            language_id: 1,
            category_name: 'ECE',
            sort_no: 2,
            status: 1,
            created_at: '2023-01-31T04:31:07.638Z',
            updated_at: '2023-01-31T04:31:07.638Z'
          },
          {
            id: 4,
            category_id: 1,
            language_id: 1,
            category_name: 'EEE',
            sort_no: 3,
            status: 1,
            created_at: '2023-01-31T04:31:07.638Z',
            updated_at: '2023-01-31T04:31:07.638Z'
          }
        ]
      }
    ],
    count: 4
  }
};

export const subCategoryData = {
    subCategoryDataGet: {
      status: 200,
      subCategories: [
        {
            subCategory: {
            id: 1,
            category_name: 'Category',
            category_id:1,
            created_at: '2023-01-31T04:31:07.638Z',
            updated_at: '2023-01-31T04:31:07.638Z'
          },
          subCategory_list: [
            {
              id: 1,
              category_id: 1,
              language_id: 1,
              category_name: 'C# Management Eng',
              sub_category_name: 'Abstraction Eng',
              sub_category_id: 1,
              sort_no: 1,
              status: 2,
              created_at: '2023-01-31T04:31:07.638Z',
              updated_at: '2023-01-31T04:31:07.638Z'
            },
            {
                id: 2,
                category_id: 1,
                language_id: 1,
                category_name: 'CSE',
                sub_category_name: 'Abstraction Eng',
                sub_category_id: 2,
                sort_no: 1,
                status: 2,
                created_at: '2023-01-31T04:31:07.638Z',
                updated_at: '2023-01-31T04:31:07.638Z'
            },
            {
                id: 3,
                category_id: 1,
                language_id: 1,
                category_name: 'ECE',
                sub_category_name: 'Abstraction Eng',
                sub_category_id: 3,
                sort_no: 1,
                status: 1,
                created_at: '2023-01-31T04:31:07.638Z',
                updated_at: '2023-01-31T04:31:07.638Z'
            },
            {
                id: 4,
                category_id: 1,
                language_id: 1,
                category_name: 'EEE',
                sub_category_name: 'Abstraction Eng',
                sub_category_id: 4,
                sort_no: 1,
                status: 1,
                created_at: '2023-01-31T04:31:07.638Z',
                updated_at: '2023-01-31T04:31:07.638Z'
            }
          ]
        }
      ],
      count: 4
    }
  };
