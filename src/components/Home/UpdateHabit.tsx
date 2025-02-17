import { useForm } from "@mantine/form";
import {
    TextInput,
    Text,
    Paper,
    Group,
    Button,
    Chip,
    Stack,
} from "@mantine/core";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHabbit } from "../../services/storage";
import { showNotification } from "@mantine/notifications";
import { Habbit } from "../../models/habbit";


interface UpdateHabitProps extends Habbit {
    onFinish: () => void;
}

export function UpdaetHabit({ name, id, onFinish }: UpdateHabitProps) {
    const client = useQueryClient();
    const form = useForm({
        initialValues: {
            name: name,
        },
    });

    const onHabbitSubmit = async (name: string) => {
        await updateHabbit(id, name);
    };

    const { mutate: update, isLoading } = useMutation(onHabbitSubmit, {
        onSuccess: () => {
            showNotification({
                title: "Success",
                message: "Great! You've updated your habit",
                color: "teal",
            })
            client.invalidateQueries(["fetchAllHabbits"]);
            onFinish();
        },
        onError: (e) => {
            showNotification({
                title: "Error",
                message: "There was an error creating your habit",
                color: "red",
            })
        },
    });

    const healthyHabits = {
		physicalHealth: [
			"🏃‍♂️ Exercise",
			"🤸‍♀️ Stretching",
			"😴 Sleep Hygiene",
			"💧 Hydration",
			"🥗 Healthy Eating",
			"🌬️ Breathing Exercises"
		],
		mentalHealth: [
			"🧘‍♀️ Mindfulness Meditation",
			"📔 Gratitude Journaling",
			"📝 Self-Reflection",
			"💬 Positive Affirmations",
			"👨‍👩‍👧‍👦 Social Connections"
		],
		productivity: [
			"⏰ Time Blocking",
			"🎯 Setting Goals",
			"⚡ Prioritizing Tasks",
			"📵 Limiting Screen Time",
			"🧹 Decluttering"
		],
		emotionalHealth: [
			"💪 Emotion Regulation",
			"💖 Forgiveness",
			"🗣️ Compassionate Self-Talk",
			"🌿 Managing Stress"
		],
		personalDevelopment: [
			"📚 Reading",
			"🎓 Learning a New Skill",
			"🔄 Consistency",
			"🧠 Reflection and Feedback"
		],
		financialHealth: [
			"💸 Budgeting",
			"💰 Saving",
			"📉 Debt Management"
		],
		environmentalHealth: [
			"🌍 Eco-Friendly Practices",
			"🌳 Spending Time Outdoors",
			"🥕 Sustainable Eating"
		]
		};


    return (
        <Paper radius="md" p="xl" withBorder={true}>
            <Text size="lg" weight={500}>
                {"So, what's your new habit name?"}
               
            </Text>
            <form onSubmit={form.onSubmit((value) => update(value.name))}>
                <Stack my="md">
                    <TextInput
                        required={true}
                        placeholder="Walk the dog 🐶"
                        value={form.values.name}
                        onChange={(event) =>
                            form.setFieldValue("name", event.currentTarget.value)
                        }
                    />
                    <Chip.Group
                        position="center"
                        onChange={(value) => {
                            if (typeof value === "string") {
                                form.setFieldValue("name", value);
                            } else {
                                form.setFieldValue("name", value.join(""));
                            }
                        }}
                    >
                        {
							Object.entries(healthyHabits).map(([category, habits]) => (
								<div key={category} className="habit-category">
									<h2>{category.replace(/([A-Z])/g, " $1").trim()}</h2>
									<Chip.Group>
										{habits.map((habit, index) => (
                                            
											<Chip key={index} onClick={() => form.setFieldValue("name", habit)}>
												{habit}
											</Chip>
										))}
									</Chip.Group>
								</div>
							))
						}
                    </Chip.Group>
                </Stack>

                <Group position="apart" mt="xl">
                    <Button
                        fullWidth={true}
                        type="submit"
                        color="teal"
                        loading={isLoading}
                    >
                        Update Habit
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}
