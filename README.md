# Graphql-tools example

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/inPhoenix/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

    Issue: mergeSchemas in graphql-tools v10 overwrites schemas instead of combining them.

## Description

The mergeSchemas function in the graphql-tools package has a problem when used with version 10. 
Instead of combining schemas as expected, it ends up overwriting them. 
To ensure compatibility with both versions of graphql-tools, I'm using version 15 of graphql. This allows for a seamless switch between the mergeSchemas function of both graphql-tools versions 
without any major complications. It's worth mentioning that ApolloServer v4 recommends using version 16 of graphql.

```javascript
const mergedSchema = mergeSchemas({
    /* executableSchema1 will be overwritten by executableSchema2
    This will happen using @graphql-tools v10 but not with the v4
    * */
    schemas: [executableSchema1, executableSchema2],
})
```
