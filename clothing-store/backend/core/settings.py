# from pathlib import Path
# import os
# import dj_database_url

# # =========================
# # BASE DIRECTORY
# # =========================

# BASE_DIR = Path(__file__).resolve().parent.parent


# # =========================
# # SECURITY
# # =========================

# SECRET_KEY = os.environ.get(
#     'SECRET_KEY',
#     'django-insecure-local-development-key'
# )

# DEBUG = os.environ.get('DEBUG', 'True') == 'True'


# # =========================
# # ALLOWED HOSTS
# # =========================

# ALLOWED_HOSTS = os.environ.get(
#     'ALLOWED_HOSTS',
#     '127.0.0.1,localhost,clothing-backend-gynt.onrender.com'
# ).split(',')


# # =========================
# # INSTALLED APPS
# # =========================

# INSTALLED_APPS = [
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',

#     # Third Party
#     'rest_framework',
#     'corsheaders',

#     # Your App
#     'api',
# ]


# # =========================
# # MIDDLEWARE
# # =========================

# MIDDLEWARE = [
#     'corsheaders.middleware.CorsMiddleware',
#     'django.middleware.security.SecurityMiddleware',
#     'whitenoise.middleware.WhiteNoiseMiddleware', # WhiteNoise add karyu
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
# ]


# # =========================
# # URL CONFIGURATION
# # =========================

# ROOT_URLCONF = 'core.urls'


# # =========================
# # TEMPLATES
# # =========================

# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.debug',
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]


# # =========================
# # WSGI
# # =========================

# WSGI_APPLICATION = 'core.wsgi.application'


# # =========================
# # DATABASE
# # =========================

# DATABASES = {
#     'default': dj_database_url.config(
#         default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
#         conn_max_age=600
#     )
# }


# # =========================
# # PASSWORD VALIDATION
# # =========================

# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'
#     },
# ]


# # =========================
# # INTERNATIONALIZATION
# # =========================

# LANGUAGE_CODE = 'en-us'

# TIME_ZONE = 'UTC'

# USE_I18N = True

# USE_TZ = True


# # =========================
# # STATIC FILES
# # =========================

# STATIC_URL = '/static/'
# STATIC_ROOT = BASE_DIR / 'staticfiles'
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# # =========================
# # DEFAULT PRIMARY KEY
# # =========================

# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# # =========================
# # CORS
# # =========================

# CORS_ALLOW_ALL_ORIGINS = False

# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:3000',
#     'http://localhost:5173',
#     'https://clothing-frontend-r77i.onrender.com',
# ]

# CORS_ALLOW_CREDENTIALS = True


# # =========================
# # DJANGO REST FRAMEWORK
# # =========================

# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     ),
# }


# # =========================
# # MEDIA FILES
# # =========================

# MEDIA_URL = '/media/'
# MEDIA_ROOT = BASE_DIR / 'media'





from pathlib import Path
import os
import dj_database_url

# =========================
# BASE DIRECTORY
# =========================

BASE_DIR = Path(__file__).resolve().parent.parent


# =========================
# SECURITY
# =========================

SECRET_KEY = os.environ.get(
    'SECRET_KEY',
    'django-insecure-local-development-key'
)

DEBUG = os.environ.get('DEBUG', 'True') == 'True'


# =========================
# ALLOWED HOSTS
# =========================

ALLOWED_HOSTS = os.environ.get(
    'ALLOWED_HOSTS',
    '127.0.0.1,localhost,clothing-backend-gynt.onrender.com'
).split(',')


# =========================
# INSTALLED APPS
# =========================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Cloudinary Apps
    'cloudinary_storage',
    'cloudinary',

    # Third Party
    'rest_framework',
    'corsheaders',

    # Your App
    'api',
]


# =========================
# MIDDLEWARE
# =========================

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# =========================
# URL CONFIGURATION
# =========================

ROOT_URLCONF = 'core.urls'


# =========================
# TEMPLATES
# =========================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# =========================
# WSGI
# =========================

WSGI_APPLICATION = 'core.wsgi.application'


# =========================
# DATABASE
# =========================

DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600
    )
}


# =========================
# PASSWORD VALIDATION
# =========================

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'
    },
]


# =========================
# INTERNATIONALIZATION
# =========================

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# =========================
# STATIC FILES
# =========================

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# =========================
# DEFAULT PRIMARY KEY
# =========================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# =========================
# CORS
# =========================

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://clothing-frontend-r77i.onrender.com',
]

CORS_ALLOW_CREDENTIALS = True


# =========================
# DJANGO REST FRAMEWORK
# =========================

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}


# =========================
# CLOUDINARY & MEDIA FILES CONFIGURATION
# =========================

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'ew4ljorh',
    'API_KEY': '822289387129993',
    'API_SECRET': 'MBjAma0XdIh0LBeIAF7qcFkl_EM'
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

MEDIA_URL = '/media/'