const alcolici = ['whisky', 'rum', 'vodka', 'birra', 'vino'];
const analcolici = ['gassosa', 'bitter', 'aranciata', 'coca cola', 'succo di frutta'];

let anniCliente = 0;

function salutaEVerifica() {
    const nomeCliente = document.getElementById('nome_cliente').value;
    const annoNascitaInput = document.getElementById('anno_nascita').value;
    const risultatoDiv = document.getElementById('risultato');
    const menuOrdineSection = document.getElementById('menu_e_ordine');
    const confermaFinaleSection = document.getElementById('conferma_finale');
    const datalist = document.getElementById('bevande-list');

    risultatoDiv.innerHTML = '';
    confermaFinaleSection.innerHTML = '';
    menuOrdineSection.classList.add('hidden');
    datalist.innerHTML = '';

    if (!nomeCliente || !annoNascitaInput || isNaN(parseInt(annoNascitaInput, 10))) {
        risultatoDiv.innerHTML = "Per favore, inserisci un nome e un anno di nascita validi.";
        return;
    }

    const annoDiNascita = parseInt(annoNascitaInput, 10);
    anniCliente = new Date().getFullYear() - annoDiNascita;
    
    let menuHtml = `<h3>Perfetto, signor ${nomeCliente}!</h3>`;
    let opzioniDaMostrare = [];

    if (anniCliente < 18) {
        menuHtml += `<p>Sei minorenne, puoi ordinare solo analcolici.</p>`;
        menuHtml += `<p>Ecco il menù analcolici: ${analcolici.join(', ')}</p>`;
        opzioniDaMostrare = analcolici;
    } else {
        menuHtml += `<p>Sei maggiorenne, puoi ordinare tutti i drink disponibili.</p>`;
        menuHtml += `<p>Ecco il menù analcolici: ${analcolici.join(', ')}</p>`;
        menuHtml += `<p>Ecco il menù alcolico: ${alcolici.join(', ')}</p>`;
        opzioniDaMostrare = [...analcolici, ...alcolici];
    }

    opzioniDaMostrare.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        datalist.appendChild(option);
    });

    risultatoDiv.innerHTML = menuHtml;
    menuOrdineSection.classList.remove('hidden');
}

function confermaOrdine() {
    const nomeCliente = document.getElementById('nome_cliente').value;
    const scelta = document.getElementById('scelta_cliente').value.toLowerCase();
    const numeroTavolo = document.getElementById('numero_tavolo').value;
    const confermaFinaleDiv = document.getElementById('conferma_finale');

    if (!scelta || !numeroTavolo) {
        confermaFinaleDiv.innerHTML = "Per favore, inserisci la tua scelta e il numero del tavolo.";
        return;
    }

    const menuDisponibile = (anniCliente < 18) ? analcolici : [...analcolici, ...alcolici];
    if (!menuDisponibile.includes(scelta)) {
        confermaFinaleDiv.innerHTML = `<p style="color: red; font-weight: bold;">"${scelta}" non è nel menù. Scegli tra le opzioni disponibili.</p>`;
        return;
    }

    const datiOrdine = {
        nome: nomeCliente,
        scelta: scelta,
        tavolo: numeroTavolo,
        timestamp: new Date().toISOString()
    };

    try {
        const ordiniEsistenti = JSON.parse(localStorage.getItem('ordini')) || [];
        ordiniEsistenti.push(datiOrdine);
        localStorage.setItem('ordini', JSON.stringify(ordiniEsistenti));
        
        confermaFinaleDiv.innerHTML = `<p>Ottima scelta, ${nomeCliente}! Il tuo ordine di ${scelta} arriverà presto al tavolo ${numeroTavolo}.</p>`;
        confermaFinaleDiv.innerHTML += `<p>Grazie per la collaborazione, buon aperitivo!</p>`;
        
    } catch (e) {
        confermaFinaleDiv.innerHTML = `<p>Errore nel salvataggio dell'ordine.</p>`;
        console.error("Errore nel salvataggio nel localStorage:", e);
    }
}