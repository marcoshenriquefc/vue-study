<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroContador v-bind:tempo-em-segundos="tempoEmSegundos" />

        <!-- Botões  -->
        <BotaoControlador @clicado="iniciar" texto='Iniciar' icone='fas fa-play' :habilitarBotao='taRodando' />
        <BotaoControlador @clicado="finalizar" texto='Finalizar' icone='fas fa-stop' :habilitarBotao='!taRodando' />
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import CronometroContador from './Cronometro.vue'
import BotaoControlador from './BotaoControlador.vue'

export default defineComponent({
    name: 'FormularioTarefa',
    components: {
        CronometroContador,
        BotaoControlador
    },
    emits: ['temporizadorFinalizado'],
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            taRodando: false
        }
    },
    methods: {
        iniciar(): void {
            if (!this.taRodando) {
                this.cronometro = setInterval(() => {
                    this.tempoEmSegundos += 1;
                }, 1000);
                this.taRodando = true;
            }
            else {
                console.log('O cronômetro já está rodando')
            }
        },
        finalizar(): void {
            clearInterval(this.cronometro);
            this.taRodando = false;
            this.$emit('temporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    }
})
</script>

<style scoped>

</style>