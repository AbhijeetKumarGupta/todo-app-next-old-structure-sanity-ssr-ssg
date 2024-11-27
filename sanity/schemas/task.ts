import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'task',
    title: 'Task',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required().min(1).error('Name is required'),
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule) => Rule.required().min(1).error('Description is required'),
      }),
      defineField({
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            { title: 'Open', value: 'open' },
            { title: 'In Progress', value: 'inprogress' },
            { title: 'Completed', value: 'completed' }
          ],
          layout: 'radio',
        },
        initialValue: 'open',
        validation: (Rule) => Rule.required().error('Status is required'),
      }),
    ]
  })
  