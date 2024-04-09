# CRUD FAST API

CRUD básico utilizando FASTAPI, Axios e MongoDB

## Instalação
Lembre de ter o Python instalado!
```bash 
pip install -r requirements
```

## Ative o ambiente

Ative o ambiente localizado na pasta .venv

```bash
.venv/Scripts/activate
```

## Server Front-End
Em um terminal:
```python
.venv/Scripts/activate
python3 -m http.server
```
## Server Back-End
Em outro terminal:
```python
.venv/Scripts/activate
uvicorn main:app --reload --port 5500
```

## Facilite os Testes com o Task

comandos:
```yml
* task api: #inicia o uvicorn 
* task clean: # Limpa a pasta .venv
* task front: #inicia o servidor python para o front
* task test: #roda o run.py para testes
* task venv: Inicia o ambiente .venv
```
