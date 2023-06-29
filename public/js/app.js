alert('WOW!');

fetch('/formsubmissions')
.then(res => res.json())
.then(formsubmissions => {
    formsubmissions.forEach(formsubmission => {
        const container = document.createElement('div');
        const h1 = document.createElement('h1');
        const h2 = document.createElement('h2');

        h1.textContent = formsubmission.name;
        h2.textContent = formsubmission.email;

        container.appendChild(h1);
        container.appendChild(h2);

        document.body.appendChild(container);
    });
});