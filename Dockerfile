# ===============================================
FROM registry.access.redhat.com/ubi8/nodejs-16 AS appbase
# ===============================================
WORKDIR /app

USER root
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Yarn
ENV YARN_VERSION 1.22.5
RUN yarn policies set-version $YARN_VERSION

COPY package.json yarn.lock /app/
RUN chown -R default:root /app

USER default

# Install dependencies
RUN yarn && yarn cache clean --force

# Copy all necessary files
COPY craco.config.js tsconfig.json .eslintignore .eslintrc.json .prettierrc.json .env /app/
COPY /plugins/ /app/plugins
COPY /public/ /app/public
COPY /scripts/ /app/scripts
COPY /src/ /app/src

# =============================
FROM appbase AS development
# =============================
WORKDIR /app
# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ENV PORT 8000

# Bake package.json start command into the image
CMD ["yarn", "start"]

EXPOSE 8000

# ===================================
FROM appbase AS staticbuilder
# ===================================
WORKDIR /app

# Set public url
ARG PUBLIC_URL

# Set generate sitemap and generate robots flag
ARG GENERATE_SITEMAP
ARG GENERATE_ROBOTS

# Set LinkedEvents url
ARG REACT_APP_LINKED_EVENTS_URL
# Set LinkedRegistrations UI url
ARG REACT_APP_LINKED_REGISTRATIONS_UI_URL

# Set OIDC settings
ARG REACT_APP_OIDC_AUTHORITY
ARG REACT_APP_OIDC_API_TOKENS_URL
ARG REACT_APP_OIDC_CLIENT_ID
ARG REACT_APP_OIDC_API_SCOPE
ARG REACT_APP_OIDC_RESPONSE_TYPE

# Set Sentry settings
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_SENTRY_ENVIRONMENT

# Set Matomo settings
ARG REACT_APP_MATOMO_URL_BASE
ARG REACT_APP_MATOMO_SITE_ID
ARG REACT_APP_MATOMO_SRC_URL
ARG REACT_APP_MATOMO_TRACKER_URL
ARG REACT_APP_MATOMO_ENABLED

# Internet place id
ARG REACT_APP_INTERNET_PLACE_ID
# Remote participation keyword id
ARG REACT_APP_REMOTE_PARTICIPATION_KEYWORD_ID
# Data source of new linked events objects
ARG REACT_APP_LINKED_EVENTS_SYSTEM_DATA_SOURCE

# Swagger URLs
ARG REACT_APP_SWAGGER_SCHEMA_URL
ARG REACT_APP_SWAGGER_URL

# Feature flags
ARG REACT_APP_SHOW_ADMIN
ARG REACT_APP_SHOW_REGISTRATION
ARG REACT_APP_LOCALIZED_IMAGE

RUN yarn build
RUN yarn generate-sitemap
RUN yarn generate-robots
RUN yarn compress

# =============================
FROM registry.access.redhat.com/ubi8/nginx-120 AS production
# =============================
USER root

RUN chgrp -R 0 /usr/share/nginx/html && \
    chmod -R g=u /usr/share/nginx/html

# Copy static build
COPY --from=staticbuilder /app/build /usr/share/nginx/html

# Copy nginx config
COPY .prod/nginx.conf /etc/nginx/nginx.conf

USER 1001

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

EXPOSE 8000
