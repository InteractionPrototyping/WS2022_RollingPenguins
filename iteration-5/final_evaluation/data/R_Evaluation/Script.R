library(data.table)
library(tidyr)
library(ggplot2)
data <- fread('RawData.csv', encoding = "UTF-8")



wilcox.test(data$ErrorsTask3, 3, exact = TRUE, correct = FALSE, alternative = "less")
# Not consistent with H1, the Wilcoxon test showed that participants do not make significantly less than 3 mistakes performing task 3 (𝑊 = 0.5, 𝑝 = .07).

wilcox.test(data$TimeTask2, 10, exact = TRUE, correct = FALSE, alternative = "less")
# Not consistent with H2, the Wilcoxon test showed that the participants do not need significantly less than 10s performing the task (𝑊 = 9, 𝑝 = .91).

wilcox.test(data$ErrorsTask4, 3, exact = TRUE, correct = FALSE, alternative = "less")
# Not consistent with H3, the Wilcoxon test showed that participants do not make significantly less than 3 mistakes performing task 4 (𝑊 = 1, 𝑝 = .09).

t.test(data$TimeTask2, mu = 11, paired = FALSE, alternative = "less")

ggplot(data, aes(x = factor(0), TimeTask2)) +
  geom_boxplot() + stat_boxplot(geom ='errorbar') +
  scale_x_discrete(breaks = NULL) +
  xlab(NULL) + ylim(0,100) # Keine Ausreißer

shapiro.test(data$TimeTask2) # Normalverteilt

t.test(data$TimeTask2, mu = 10, paired = FALSE, alternative = "greater")

