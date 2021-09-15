# Checklist-completed javascript action

This action checks if a pull requests task list is complete

## Example usage

```yaml
name: Action
on:
  pull_request:
    types: [opened, edited]
jobs:
  checklist:
    name: Verify checklist
    runs-on: ubuntu-latest
    steps:
      - uses: nordcloud/checklist-completed@master
    concurrency:
      group: ${{ github.head_ref }}
      cancel-in-progress: true
```

## Contributing

- Run `npm run build` after making a new changes to the runtime code

## Credits

- [task-list-completed](https://github.com/stilliard/github-task-list-completed)
