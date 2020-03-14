var app = new Vue({
  el: '#app',
  data: {
    note: {
      title: '',
      details: [{
        text: '',
        done: false
      }],
      text: '',
      date: '',
      tag: '',
      done: false,
    },
    notes: [{}],
    details: [{
      text: '',
      done: false
    }]
  },
  methods: {
    addNote(e) {
      let {
        title, text, tag
      } = this.note

      this.note.details = this.details

      let details = this.note.details

      this.notes.push({
        title,
        details,
        text,
        date: new Date(Date.now()).toLocaleString(),
        tag,
        done: false,
      })

      // Reset form after submit
      this.note.title = ''
      this.details = [{
        text: '',
        done: false
      }]
      this.note.text = ''
      this.note.tag = ''

      e.preventDefault()
    },
    removeNote(index) {
      this.$delete(this.notes, index)
    },
    setDone(index) {
      this.notes[index].done = !this.notes[index].done
    },
    setDetailDone(note, detail) {
      this.notes[note].details[detail].done = !this.notes[note].details[detail].done
    },
    editNote(index) {

    },
    addDetail(index){
      this.details.push({ text: '', done: false });
    },
    removeDetail(index){
      this.details.splice(index, 1);
    }
  },
  mounted() {
    if (localStorage.getItem('notes')) this.notes = JSON.parse(localStorage.getItem('notes'));
  },
  watch: {
    notes: {
      handler() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
      },
      deep: true,
    },
  }
});


