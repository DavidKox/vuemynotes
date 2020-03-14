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

            // reset form after submit
            this.note.title = ''
            this.note.text = ''
            this.note.tag = ''
            this.details = [{
                text: '',
                done: false
            }]

            e.preventDefault()
        },
        removeNote(i) {
            this.$delete(this.notes, i)
        },
        setDone(i) {
            // toggle true/false
            this.notes[i].done = !this.notes[i].done
        },
        setDetailDone(note, detail) {
            // toggle true/false
            this.notes[note].details[detail].done = !this.notes[note].details[detail].done
        },
        editNote(i) {
            // set the form with the current values
            this.note.title = this.notes[i].title
            this.note.text = this.notes[i].text
            this.note.tag = this.notes[i].tag
            this.details = this.notes[i].details

            // delete note to avoid duplicates
            this.removeNote(i)
        },
        addDetail(i) {
            this.details.push({text: '', done: false});
        },
        removeDetail(i) {
            this.$delete(this.details, i);
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


