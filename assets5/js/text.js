const Api = "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";

    const text = document.querySelector(".text");
    const area = document.querySelector(".area");

    const getText = async () => {
      try {
        // Send request to OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Api}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant.",
              },
              {
                role: "user",
                content: text.value,
              },
            ],
          }),
        });

        // Parse the response
        const data = await response.json();

        console.log(data);

        area.value = data.choices[0].message.content;
      } catch (error) {
        console.error("Error:", error);
      }
    };