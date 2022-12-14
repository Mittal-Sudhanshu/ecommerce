[
  {
    path: '/api/user',
    methods: [ 'POST' ],
    middlewares: [ 'asyncUtilWrap' ]
  },
  {
    path: '/api/user/validate',
    methods: [ 'POST' ],
    middlewares: [ 'otpValidator', 'asyncUtilWrap' ]
  },
  {
    path: '/api/user/login',
    methods: [ 'POST' ],
    middlewares: [ 'asyncUtilWrap' ]
  },
  {
    path: '/api/products/category',
    methods: [ 'GET' ],
    middlewares: [ 'asyncUtilWrap' ]
  },
  {
    path: '/api/products',
    methods: [ 'POST', 'GET' ],
    middlewares: [ 'asyncUtilWrap', 'asyncUtilWrap', 'asyncUtilWrap' ]
  },
  {
    path: '/api/products/:id',
    methods: [ 'PATCH' ],
    middlewares: [ 'asyncUtilWrap', 'asyncUtilWrap' ]
  },
  {
    path: '/api/products/delete/:id',
    methods: [ 'DELETE' ],
    middlewares: [ 'asyncUtilWrap', 'asyncUtilWrap' ]
  },
  {
    path: '/api/myOrder',
    methods: [ 'GET' ],
    middlewares: [ 'asyncUtilWrap', 'asyncUtilWrap' ]
  },
  {
    path: '/api/category',
    methods: [ 'POST', 'GET' ],
    middlewares: [ 'asyncUtilWrap', 'asyncUtilWrap', 'asyncUtilWrap' ]
  }
]