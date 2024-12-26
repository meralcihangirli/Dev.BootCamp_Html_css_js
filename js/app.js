document.addEventListener('DOMContentLoaded', () => {
    // Dropdown Menüsü İşlevselliği
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach(button => {
        button.addEventListener('click', () => {
            const dropdownContent = button.nextElementSibling;
            const allDropdownContents = document.querySelectorAll('.dropdown-content');

            allDropdownContents.forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('show');
                }
            });

            dropdownContent.classList.toggle('show');
        });
    });

    //bulunulan sayfadaki ismi dropdowndan kaldırma
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.dropdown-content a');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.remove();
        }
    });

    //performans ölçümü
    if (currentPage === 'profiling.html') {
        console.time("Loop Time");
        for (let i = 0; i < 1000000; i++) {
//1 milyon kez çalışır,yüksek sayıda tekrar 
        }
        console.timeEnd("Loop Time");

        //Bellek kullanım analizi
        const largeArray = new Array(1000000).fill(0);
        console.log("Bellek Kullanımı: ", window.performance.memory.usedJSHeapSize);

        //Yavas script tespiti
        setTimeout(() => {
            console.time("Yavaş İşlem");
            for (let i = 0; i < 1000000; i++) {
                let x = i * i;
            }
            console.timeEnd("Yavaş İşlem")
        }, 1000);
    }

    // localStorage İşlevselliği
    const localStorageInput = document.getElementById('localStorageInput');
    const localStorageOutput = document.getElementById('localStorageOutput');

    window.saveToLocalStorage = function saveToLocalStorage() {
        const value = localStorageInput.value;
        localStorage.setItem('storedValue', value);
        displayLocalStorageValue();
    }

    function displayLocalStorageValue() {
        const value = localStorage.getItem('storedValue');
        localStorageOutput.textContent = value ? `Kaydedilen Veri: ${value}` : 'Henüz bir veri kaydedilmedi.';
    }

    if (localStorageInput && localStorageOutput) {
        displayLocalStorageValue(); // Sayfa yüklendiğinde mevcut veriyi göster
    }

    // sessionStorage İşlevselliği
    const sessionStorageInput = document.getElementById('sessionStorageInput');
    const sessionStorageOutput = document.getElementById('sessionStorageOutput');

    window.saveToSessionStorage = function saveToSessionStorage() {
        const value = sessionStorageInput.value;
        sessionStorage.setItem('storedValue', value);
        displaySessionStorageValue();
    }

    function displaySessionStorageValue() {
        const value = sessionStorage.getItem('storedValue');
        sessionStorageOutput.textContent = value ? `Kaydedilen Veri(Geçici): ${value}` : 'Henüz bir veri kaydedilmedi.';
    }

    if (sessionStorageInput && sessionStorageOutput) {
        displaySessionStorageValue(); // Sayfa yüklendiğinde mevcut veriyi göster
    }

    //ToDo Listesi
    let todos = []
    window.addTodo = function addTodo() {
        const todoInput = document.getElementById('todoInput');
        const todoText = todoInput.value.trim();
        if (todoText) {
            todos = [...todos, todoText];
            renderTodos();
            todoInput.value = '';
        }
    };

    function renderTodos() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = todos.map((todo, index) => `<li>${todo} <button onclick="deleteTodo(${index})">Sil</button></li>`).join('');
    }

    window.deleteTodo = function deleteTodo(index) {
        todos = todos.filter((_, i) => i !== index);
        renderTodos();
    }

    // API Veri Çekme
    window.fetchData = async function fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            document.getElementById('api-data-container').innerHTML = data.map(post => `<p>${post.title}</p>`).join('');
        }
        catch (error) {
            document.getElementById('api-data-container').innerHTML = `<p>Hata: Veri Çekilemedi</p>`;
        }
    };

    // this kullanımı
    const user = {
        name: 'Meral',
        occupation: 'CodeLover',
        greet() {
            const message = `Merhaba, ben ${this.name} ve ben bir  ${this.occupation} olarak yaşamayı seviyorum.`;
            const userContainer = document.getElementById('user-container');
            if (userContainer) {
                userContainer.innerText = message;
            }
        }
    };

    // sayfa yüklendiğinde kullanıcıyı selamlama
    window.onload = () => user.greet();

    // Closure kullanarak sayaç
    const createCounter = () => {
        let count = 0;
        return {
            increment: () => ++count,
            decrement: () => --count,
            value: () => count
        };
    };

    const counter = createCounter();

    // Arttırır ve azaltır butonlarının olay dinleyicileri
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');

    if (incrementBtn) {
        incrementBtn.onclick = () => {
            document.getElementById('counterValue').innerText = counter.increment();
        };
    }

    if (decrementBtn) {
        decrementBtn.onclick = () => {
            document.getElementById('counterValue').innerText = counter.decrement();
        };
    }


    //Veri izleme örneği
    console.log("Veri izleme başladı...");
    let data = [1, 2, 3, 4, 5];
    data.forEach(item => {
      //  debugger;
        console.log(item);
    });

    //Hata ayıklama için fonksiyon
    function addNumbers(a, b) {
        try {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error("Her iki parametre de sayı olmalıdır");
            }
            return a + b;
        } catch (error) {
            console.error("Hata yakalandı", error);
        }
    }
    addNumbers(10, 8);

    //Elementleri inceleme ve değiştirme
    if (currentPage === 'dev-tools.html') {
        const exampleElement = document.createElement('div');
        exampleElement.id = 'example-element';
        exampleElement.style.backgroundColor = 'lightblue';
        exampleElement.style.padding = '10px';
        exampleElement.innerText = 'Bu bir örnek elementtir.';
        const footer = document.querySelector('footer');
        document.body.insertBefore(exampleElement, footer);
    }

    // Network İstekleri (API Çağrıları) 
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            console.log("API Verisi Yüklendi:", data);

        })
        .catch(error => console.error("API Çağrısında Hata:", error));
});

