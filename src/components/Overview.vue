<template>
    <div>
        <h3><em>{{ numberOfUsableSlots }}</em> opportunities of usable riding<br>in the next <em>48</em> Hours.</h3>
        <h3 v-if="!hasAnyValidConditions">It looks pretty grim out there. Time for a rest day 😴</h3>
        <h3 v-if="hasAnyValidConditions">Next slot: <em>{{ nextUsableSlot | dateTimeDisplay }}</em></h3> 
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { canIRideFn, conditions } from "../model/UsableConditions";
import { Forecast } from '../model/Models';

export default Vue.extend({
    props: {
        forecasts: { type: Array }
    },
    filters: {
        dateTimeDisplay(date: Date): string {
            var dateOptions = { weekday: "long", month: "long", day: "numeric" };
            const dateStr = date.toLocaleDateString("en-GB", dateOptions);
            var timeOptions = { hour: "numeric", minute: "numeric" };
            const timeStr = date.toLocaleTimeString("en-GB", timeOptions)
            return `${timeStr} ${dateStr}`;
        }
    },
    computed: {
        hasAnyValidConditions: function(): boolean {
            if(this.forecasts == null)
                return false;
            
            const fcasts = this.forecasts as Forecast[];
            const hasValidConditions = fcasts
                        .map((x: Forecast) => canIRideFn(x, conditions))
                        .some(x => x === true);

            return hasValidConditions;
        },
        numberOfUsableSlots: function(): number {
            const fcasts = this.forecasts as Forecast[];
            const numberValidConditions = fcasts
                        .map((x: Forecast) => canIRideFn(x, conditions))
                        .filter(x => x === true)
                        .length;

            return numberValidConditions;
        },
        nextUsableSlot: function(): Date | null {
            const fcasts = this.forecasts as Forecast[];
            const validConditions = fcasts
                        .map((x: Forecast) => ({
                            date: x.time,
                            valid: canIRideFn(x, conditions),
                        }))
                        .filter(x => x.valid === true);

            if(validConditions.length > 0)
                return validConditions[0].date;

            return null;
        }
    }
})
</script>

<style lang="scss" scoped>

</style>