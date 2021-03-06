package hole6

class Incalculable : Throwable()

internal class TakeHomeCalculator(private val taxRate: TaxRate) {
    fun netAmount(first: Money, vararg rest: Money): Money {
        val monies: List<Money> = rest.toList()

        var total = first

        monies.forEach { total += it }

        val tax = taxRate.apply(total)

        return total - tax
    }
}

internal data class Money(val value: Int, val currency: String) {
    operator fun plus(other: Money): Money {
        if (other.currency != currency) {
            throw Incalculable()
        }
        return Money(value + other.value, other.currency)
    }

    operator fun minus(other: Money): Money {
        if (other.currency != currency) {
            throw Incalculable()
        }
        return Money(value - other.value, currency)
    }
}

internal data class TaxRate(private val percent: Int) {
    fun apply(total: Money): Money {
        val amount = total.value * (percent / 100.0)
        return Money(amount.toInt(), total.currency)
    }
}
