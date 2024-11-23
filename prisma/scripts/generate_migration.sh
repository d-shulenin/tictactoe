#!/bin/bash

# Prisma does not generate rollback (down script) by default
# This script will generate the down script for each migration

name=$1
dir=$(pwd)

if [ -z "$name" ]
then
  echo "Please provide a name for the migration"
  exit 1
fi

echo "Generating migration $name"

echo "Generating down.sql"
# generate the down.sql first before the migration
dotenv -e .env.development -- npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma --script > /tmp/down.sql

echo "Executing migration"
# generate the migration file and apply it
npx dotenv -e .env.development -- npx prisma migrate dev --name $name

# find the latest migration
migration_path="${dir}/prisma/migrations"
latest_path=$(ls -td -- "${migration_path}"/*/ | head -n 1)
migration_name=$(basename "${latest_path%/}")

# adding the rollback for migration table
echo "-- remove the last migration from the _prisma_migrations table" >> /tmp/down.sql
echo "DELETE FROM _prisma_migrations WHERE migration_name = '${migration_name}';" >> /tmp/down.sql
mv /tmp/down.sql ${dir}/prisma/migrations/${migration_name}/

echo "Done"