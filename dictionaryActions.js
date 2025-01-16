import DBLocal from './db-local'

const { Schema } = new DBLocal({ path: '././db' })
const Word = Schema('user-search', {
  _id: { type: 'string', required: true },
  word: { type: 'string', required: true },
  date: { type: 'string', required: true }
})

export class DictionaryActions {
  static searchWords (wordSearched) {
    const findWord = Word.findOne({ word: wordSearched })
    return findWord || 'Word not found'
  }

  static addWord (word) {
    const wordException = Word.findOne({ word })
    if (wordException) throw new Error('Word already exists')

    const id = crypto.randomUUID()
    const date = new Date().toISOString().split('T')[0]

    Word.create({
      _id: id,
      word,
      date
    }).save()

    return { id, word, date }
  }

  static updateWordList () {
    return Word.find()
  }
}
