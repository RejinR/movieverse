# Use the official PostgreSQL image from Docker Hub
FROM postgres

# Set the environment variables
ENV POSTGRES_USER rejin
ENV POSTGRES_PASSWORD p@ssw0rd
ENV POSTGRES_DB movies

# Copy the SQL scripts to initialize the database (if needed)
# COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port (optional)
EXPOSE 5432