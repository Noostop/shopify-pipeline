const fs = require('fs-extra')
const path = require('path')

// @TODO find out a way to never run this twice ?

module.exports = (root) => {
  const packageJsonPath = path.join(root, 'package.json')
  // eslint-disable-next-line
  const packageJson = require(packageJsonPath)

  packageJson.scripts = {
    serve: 'shopify-pipeline serve',
    build: 'shopify-pipeline build',
    deploy: 'shopify-pipeline build --deploy',
    test: 'shopify-pipeline test --coverage'
  }
  packageJson.babel = { presets: ['env'] }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  fs.copySync(path.join(__dirname, '../template'), root)
  fs.copySync(path.join(__dirname, '../README.md'), path.join(root, 'README.md'))

  fs.moveSync(path.join(root, 'gitignore'), path.join(root, '.gitignore'))
}
